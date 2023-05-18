import { parse } from 'postcss';
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

    modal.style.display = "grid";
    modalImg.src = event.src;

    const position = event.getAttribute('position');
    const countPhotos = document.querySelectorAll('.xukint-photos .grid-item').length;
    
    modalImg.setAttribute('position', position);
    modalImg.setAttribute('limit', countPhotos);
    
    document.getElementById('last-photo').style.display = position < 2 ? 'none' : 'grid';
    document.getElementById('next-photo').style.display = position == countPhotos ? 'none' : 'grid';
    
    let caption = event.alt;

    if ( event.getAttribute("nsfw") == 1 && ! event.getAttribute("user") ) {
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
    const photoModal = document.getElementById('photo-modal');
    
    const caption = document.getElementById('caption');
    const lastPhoto = document.getElementById('last-photo');
    const nextPhoto = document.getElementById('next-photo');
    
    if ( 
        photoModal && ! photoModal.contains(e.target) && modal.classList.contains('ready-close') && ! caption.contains(e.target) 
        && ! lastPhoto.contains(e.target) && ! nextPhoto.contains(e.target)
        ) {
            closeModal();
        } else {
            modal.classList.add("ready-close");
        }
    });

function lastPhoto() {
    const photoModal = document.getElementById('photo-modal');
    let position = photoModal.getAttribute('position');

    if (parseInt(position) < 2) {
        return;
    }

    position--;
    const lastPhoto = document.querySelector(`.xukint-photos picture img[position="${position}"]`);
    closeModal();
    lastPhoto.click();
}


function nextPhoto() {
    const photoModal = document.getElementById('photo-modal');
    let position = photoModal.getAttribute('position');
    const limit = photoModal.getAttribute('limit');

    if (parseInt(position) >= parseInt(limit)) {
        return;
    }

    position++;
    const nextPhoto = document.querySelector(`.xukint-photos picture img[position="${position}"]`);
    closeModal();
    nextPhoto.click();
}

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
            
            <div id="last-photo" className='absolute w-10 h-full left-0 top-0 grid content-center'>
                <img className='w-8 bg-gray-900/20 justify-self-start cursor-pointer' src="/assets/img/arrow-small-left.svg" alt="Arrow" onClick={lastPhoto} />
            </div>
            <img 
                className="modal-content object-contain m-auto block w-auto" 
                id="photo-modal"
                style={{maxHeight : 'calc(80vh)'}}
            />
            <div id="next-photo" className='absolute w-10 h-full right-0 top-0 grid content-center'>
                <img className='w-8 bg-gray-900/20 justify-self-end cursor-pointer' src="/assets/img/arrow-small-right.svg" alt="Arrow" onClick={nextPhoto}/>
            </div>

            <div 
                className='absolute w-full px-8 py-4 bg-neutral-900/50 text-center text-white m-auto left-0 bottom-4' 
                id="caption"
            ></div>
        </div>
    );
}

export { fullWidth, fullWidthOverlay, Modal };