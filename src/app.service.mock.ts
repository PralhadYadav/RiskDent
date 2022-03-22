export class AppServiceMock {

    getHello() {
        return 'Hello Fraud!'
    }

    getTransactionDetails(transactionId: string, confidence: string) {
        return {
            "id": "5c868b2291d7da41e51f314a",
            "age": 34,
            "name": "Sanchez Collier",
            "email": "wilcoxmcmahon@equicom.com",
            "phone": "(828) 496-2100",
            "connectionInfo": {
                "type": "sameName",
                "confidence": 1
            },
            "geoInfo": {
                "latitude": 27.118481,
                "longitude": 101.345203
            },
            "children": []
        }
    }
}