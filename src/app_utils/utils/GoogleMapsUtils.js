/**
 * This initializes a Google Map element with the ID if it doesn't already exists.
 * It runs the callback after successfully initializing the Google Map
 * @param {*} callback
 */
export const loadGoogleMaps = (callback, api_key) => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
        const googleMapsCallbackScript = document.createElement("script");
        const fn = "function initGoogleMaps(){ console.log('Map Loaded'); }";
        googleMapsCallbackScript.innerHTML = fn;
        document.body.appendChild(googleMapsCallbackScript);

        const script = document.createElement("script");
        script.src = `https://maps.google.com/maps/api/js?key=${api_key}&region=UG&callback=initGoogleMaps`;
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }

    if (existingScript && callback) callback();
};

/**
 * This removes the Google Maps element if it exists from the page
 */
export const removeGoogleMaps = () => {
    const mapScript = document.getElementById("googleMaps");

    if (mapScript) {
        mapScript.parentNode.removeChild(mapScript);

        const head = document.getElementsByTagName("head")[0];
        const scripts = head.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            let script = scripts[i];
            let src = script.src;

            if (src.startsWith("https://maps.google.com/maps")) {
                head.removeChild(script);
            }
        }
    }
};
