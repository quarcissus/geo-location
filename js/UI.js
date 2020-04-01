
class UI {
    constructor() {
        this.geoapi = new GEOAPI();
    }

    async places(lat, long){
        return this.geoapi.geoLocations(lat,long)
            .then((response)=>{
                return response
            })
    }

}