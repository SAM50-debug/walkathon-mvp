const generateBtn = document.getElementById("generate")
const downloadBtn = document.getElementById("download")

const nameInput = document.getElementById("name")
const deptInput = document.getElementById("department")

const canvas = document.getElementById("certificateCanvas")
const ctx = canvas.getContext("2d")


/* SERIAL API */

async function getSerial(name, department){

const response = await fetch(
"https://script.google.com/macros/s/AKfycbxN0zkm-_QOJ9DU7qT0amFs4JvoExv_iPXzkFdWnVk5eT4BuY8Pu5c8hGVkx_RiI5SopQ/exec",
{
method:"POST",
body:JSON.stringify({
name:name,
department:department
})
})

const data = await response.json()

return data.serial

}


/* AUTO NAME FIT */

function fitName(text,maxWidth,startSize){

let size=startSize

ctx.font=`bold ${size}px serif`

while(ctx.measureText(text).width > maxWidth && size > 16){
    size--
    ctx.font = `bold ${size}px serif`
}

return size

}


/* GENERATE BUTTON */

generateBtn.addEventListener("click", async ()=>{
const name=nameInput.value.trim()
const dept=deptInput.value.trim()

if(!name || !dept){
alert("Enter name and department")
return
}

// Show loading state and hide old download button
const loadingState = document.getElementById("loadingState")
if (loadingState) loadingState.style.display = "block"
downloadBtn.style.display = "none"
generateBtn.disabled = true;
generateBtn.textContent = "Generating...";

try {
    const serial=await getSerial(name,dept)
    drawCertificate(name,dept,serial)
} catch (error) {
    console.error("Error generating certificate", error)
    alert("Failed to generate certificate. Please try again.")
} finally {
    if (loadingState) loadingState.style.display = "none"
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Certificate";
}
})


/* DRAW CERTIFICATE */

function drawCertificate(name,dept,serial){

const img=new Image()

img.crossOrigin="anonymous"

img.src="assets/certificate/certificate-template.png"

img.onload=function(){

canvas.width=img.width
canvas.height=img.height

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(img,0,0)

/* TEXT COLOR */

ctx.fillStyle="#2f5f2f"

ctx.textAlign="center"


/* NAME */

const fontSize=fitName(
name.toUpperCase(),
canvas.width*0.55,
60
)

ctx.font=`bold ${fontSize}px serif`

ctx.fillText(
name.toUpperCase(),
canvas.width*0.35,
canvas.height*0.46
)


/* DEPARTMENT */

ctx.font="30px serif"

ctx.fillText(
dept,
canvas.width*0.35,
canvas.height*0.555,
)


/* SERIAL NUMBER */

const serialDigits=serial.split("/").pop()

ctx.save()

ctx.translate(
canvas.width*0.990,
canvas.height*0.347,
)

ctx.rotate(-Math.PI/2)

ctx.textAlign="center"
ctx.fillStyle="#000"

ctx.font="bold 30px sans-serif"

ctx.fillText(serialDigits,0,0)

 ctx.restore()

// Show download button once drawn
document.getElementById('download').style.display = 'block';

}

}


/* DOWNLOAD */

downloadBtn.addEventListener("click",()=>{

if(canvas.width===0){
alert("Generate certificate first")
return
}

const link=document.createElement("a")

link.download="Walkathon_Certificate.png"

link.href=canvas.toDataURL("image/png")

document.body.appendChild(link)

link.click()

document.body.removeChild(link)

})

/* -------------------------------------------
   UI & INTERACTION LOGIC
------------------------------------------- */

// ---- Lightbox Modal ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    // Read the src attribute directly from the child img tag
    lightboxImg.src = element.querySelector('img').src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox(event) {
    // If clicking outside the image or on the close button
    if (!event || event.target === lightbox || event.target.classList.contains('close-modal')) {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    }
}

/* ---- Video Modal ---- */

const videoModal = document.getElementById("videoModal")
const videoPlayer = document.getElementById("videoPlayer")

function openVideoModal(videoUrl){

videoPlayer.src = videoUrl
videoModal.classList.add("show")
document.body.style.overflow = "hidden"

}

function closeVideoModal(event){

if(!event || event.target === videoModal || event.target.classList.contains("close-modal")){

videoModal.classList.remove("show")
document.body.style.overflow = "auto"

setTimeout(()=>{
videoPlayer.src = ""
},300)

}

}

// ---- Scroll Animations ----
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Advanced Parallax for Hero section
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Only animate if hero is in view to save performance
            if(scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
            }
        });
    }

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeVideoModal();
        }
    });
});