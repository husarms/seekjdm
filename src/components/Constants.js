// Contains different types of constant data to be consumed by front-end

class Constants {
    static get makes() {
        return [
            "Acura",
            "Honda",
            "Nissan",
            "Datsun",
            "Mazda",
            "Subaru",
            "Suzuki",
            "Toyota",
            "Lexus",
            "Daihatsu",
            "Mitsubishi",
            "VW"
        ];
    }
    static get makesAndModels(){
        return [
            {
                "Make": "Honda",
                "Models": [
                    "Beat",
                    "Civic",
                    "Inspire"
                ]
            },
            {
                "Make": "Mazda",
                "Models": [
                    "RX-7"
                ]
            },
            {
                "Make": "Mitsubishi",
                "Models": [
                    "Pajero",
                    "GTO",
                    "Lancer",
                    "Evolution",
                    "Evo"
                ]
            },
            {
                "Make": "Nissan",
                "Models": [
                    "180SX",
                    "Cima",
                    "Fairlady",
                    "Figaro",
                    "Homy",
                    "Pao",
                    "Patrol",
                    "Skyline",
                    "Silvia"
                ]
            },
            {
                "Make": "Subaru",
                "Models": [
                    "Sambar",
                    "Impreza"
                ]
            },
            {
                "Make": "Suzuki",
                "Models": [
                    "Cappuccino",
                    "Alto Works"
                ]
            },
            {
                "Make": "Toyota",
                "Models": [
                    "Aristo",
                    "Crown",
                    "Celsior",
                    "Chaser",
                    "Mark II",
                    "Cresta",
                    "Soarer",
                    "Supra"
                ]
            }
        ];
    }
}

export default Constants;