import { LoggerService } from './common/services/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { sample_response } from './common/constants/sample_response'
@Injectable()

/**
 * @description Appservice use to return api requests response data
 */
export class AppService {


  /**
   * @description response use to hold the transactionid data
   */
  response;

  /**
 * @description confidanceData use to hold the final result with confidence param check.
 */
  confidanceData = [];

  /**
* @description loggerService use to log all the error or logs.
*/
  private readonly loggerService: LoggerService = new LoggerService(AppService.name)

  constructor() {

  }

  /**
* @description getHello method use to define default route.
*/
  getHello(): string {
    return 'Hello Fraud Detector!';
  }

  /**
* @description getTransactionDetails method is first method get called when transactions api get called.
*/
  getTransactionDetails(requestId, confidence) {
    try {
      this.response = '';
      this.confidanceData = []
      loop:
      for (let transaction of sample_response) {
        if (transaction.id === requestId) {
          this.response = transaction;
          break loop;
        } else {
          this.getTransactions(transaction.children, requestId);
          if (this.response) {
            break loop;
          }
        }
      }
      if (this.response) {
        let childrenArr = [];
        let parentType = this.response.connectionInfo ? [this.response.connectionInfo.type] : null;
        let paranetConf = this.response.connectionInfo ? this.response.connectionInfo.confidence : null;
        if (this.response.children && this.response.children.length > 0) {
          childrenArr = this.response.children;
        }
        const resJson = (({ children, ...o }) => o)(this.response)
        this.confidanceData.push(resJson);
        if (childrenArr.length > 0) {
          this.getChildConfidenceData(parentType, paranetConf, childrenArr, confidence);
          return this.confidanceData;
        } else {
          return this.confidanceData;
        }
      } else {
        return { status: 400, message: 'No Data Found' }
      }
    } catch (err) {
      this.loggerService.error("Err from getTransactionDetails", err)
    }


  }

  /**
* @description getTransactions method is recursive function which check all childern transaction and find matching one.
*/
  getTransactions(childArray, id) {
    try {
      if (childArray && childArray.length > 0) {
        loop:
        for (let transaction of childArray) {
          if (transaction.id === id) {
            this.response = transaction;
            break loop;
          } else {
            this.getTransactions(transaction.children, id)
          }
        }
        if (this.response) {
          return this.response;
        }
      }
    } catch (err) {
      this.loggerService.error("Error from getTransactions ", err)
    }

  }

  /**
* @description getChildConfidenceData method is recursive function which check for confidence params over the previous response of matching transaction id param.
*/
  getChildConfidenceData(parentType = [], parentConf = null, childArr, confidence) {
    try {
      for (let child of childArr) {
        if (child.connectionInfo.confidence >= confidence) {
          let currConf = child.connectionInfo.confidence;
          let currType = child.connectionInfo.type;
          let childrenArr = [];
          if (child.children) {
            childrenArr = child.children;
          }
          let combinedConnectionInfo = {
            type: parentType ? [...new Set([...parentType, currType])] : [currType],
            confidence: parentConf ? parentConf * currConf : currConf
          }
          combinedConnectionInfo.type = [...new Set(combinedConnectionInfo.type)]
          child["combinedConnectionInfo"] = combinedConnectionInfo;
          const resJson = (({ children, ...o }) => o)(child)
          this.confidanceData.push(resJson);
          if (childrenArr && childrenArr.length > 0) {
            this.getChildConfidenceData(combinedConnectionInfo.type, combinedConnectionInfo.confidence, childrenArr, confidence);
          }
        }
      }
    } catch (err) {
      this.loggerService.error("Error from getChildConfidenceData ", err)
    }
  }
}
