export const MARATHON_DISTANCE_KM = 42.195;
export const KMS_PER_MILE = 1.609344;
export const SPLITS = {
    "km": [
        { "display": "5 km", "value": 5 },
        { "display": "10 km", "value": 10 },
        { "display": "15 km", "value": 15 },
        { "display": "20 km", "value": 20 },
        { "display": "Half", "value": MARATHON_DISTANCE_KM / 2 },
        { "display": "25 km", "value": 25 },
        { "display": "30 km", "value": 30 },
        { "display": "35 km", "value": 35 },
        { "display": "40 km", "value": 40 },
        { "display": "Finish", "value": MARATHON_DISTANCE_KM },
    ],
    "mi": [
        { "display": "5 mi", "value": 5 * KMS_PER_MILE },
        { "display": "10 mi", "value": 10 * KMS_PER_MILE },
        { "display": "Half", "value": MARATHON_DISTANCE_KM / 2 },
        { "display": "15 mi", "value": 15 * KMS_PER_MILE },
        { "display": "20 mi", "value": 20 * KMS_PER_MILE },
        { "display": "25 mi", "value": 25 * KMS_PER_MILE },
        { "display": "Finish", "value": MARATHON_DISTANCE_KM },
    ],
};