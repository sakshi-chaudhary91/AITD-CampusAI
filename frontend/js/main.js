window.addEventListener("load",()=>{

    const loader=document.getElementById("preloader");

    loader.style.opacity="0";

    setTimeout(()=>{

        loader.style.display="none";

    },600);

});