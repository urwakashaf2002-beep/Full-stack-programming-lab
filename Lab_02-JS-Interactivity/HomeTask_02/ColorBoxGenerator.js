function addColors()
{
    let colors=[c1.value,c2.value,c3.value];
    let container=document.getElementById("boxes");

    colors.forEach(color=>{
        if(color.trim()!=="")
            {
            let div=document.createElement("div");
            div.className="box";
            div.style.backgroundColor=color;
            div.style.boxShadow="0 0 20px "+color;
            container.appendChild(div);
        }
    });

    // BONUS: BOM info
    info.innerHTML=
    "Window: "+window.innerWidth+" x "+window.innerHeight+
    "<br>Browser: "+navigator.userAgent;
}

function clearBoxes()
{
    boxes.innerHTML="";
}
