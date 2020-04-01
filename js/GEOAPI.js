class GEOAPI{

    
    async geoLocations(lat, long){
        const response = await fetch(`https://places.sit.ls.hereapi.com/places/v1/discover/explore?app_id=ODpF0kqkjmOuL3CD4WFB&app_code=Ff6w4JbHGWUOzRv6VdK2UA&at=${lat},${long}&pretty`);
        const locations = await response.json();
        return locations;
    }
}