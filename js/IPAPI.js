class IPAPI{
    async getAPIuser(){
        const response = await fetch('https://api.ipify.org/?format=json');
        const ip = await response.json();
        return ip;
    }
}