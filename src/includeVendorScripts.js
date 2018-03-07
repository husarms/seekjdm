export default function include() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "/vendor/material-components-web.min.js";
    document.body.appendChild(script);
}