import './modalStyle.css';

function fullWidthOverlay(e) {
    if ( e.target.dataset?.id ) {
        fullWidth( document.getElementById(`img-${e.target.dataset.id}`) );
    }
}

function fullWidth(event) { 
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("photo-modal");
    let captionText = document.getElementById("caption");
    
    if ( event?.target ) {
        event = event?.target;
    }

    modal.style.display = "block";
    modalImg.src = event.src;

    let caption = event.alt;

    if ( event.getAttribute("nsfw") && ! event.getAttribute("user   ") ) {
        caption += " (Para ver esta foto se requiere que <a style='font-weight: bold;text-decoration-line: underline;' href='/login'>inicies sesión</a>)";
    }
    captionText.innerHTML = caption;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.classList.remove("ready-close");
}

window.addEventListener('click', function(e){   
    const modal = document.getElementById("modal");

    if ( ! document.getElementById('photo-modal').contains(e.target) && modal.classList.contains('ready-close') ) {
        closeModal();
    } else {
        modal.classList.add("ready-close");
    }
});

function Modal() {
    return (
        <div 
            id="modal" 
            className="modal hidden fixed z-10 px-0 py-20 left-0 top-0 w-full h-full bg-black/70"
        >

            <span 
                id="close-modal"
                className="close absolute top-6 text-white right-8 font-bold text-4xl duration-300 hover:cursor-pointer hover:text-stone-500 focus:cursor-pointer focus:text-stone-500" 
                onClick={() => closeModal}
            >
                &times;
            </span>
            
            <img 
                className="modal-content object-contain m-auto block h-full w-auto" 
                id="photo-modal" 
            />

            <div 
                className='absolute w-full px-8 py-4 bg-neutral-900/50 text-center text-white m-auto left-0 bottom-4' 
                id="caption"
            ></div>
        </div>
    );
}

export { fullWidth, fullWidthOverlay, Modal };