import Pagination from '@/Components/Pagination';
import ComingSoon from './ComingSoon';
import {fullWidth, fullWidthOverlay, Modal} from './Modal';
import './style.css';

export default function Photos(props) {
    if ( ! props.photos.data || props.photos.data.length === 0 ) {
        return <ComingSoon />;
    }

    return (
        <div className='xukint-photos my-4'>
            <div className='list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 grid-flow-dense'>
                {
                    props.photos.data.map(photo => (
                        <div className={`grid-item relative photo-${photo.id}`} key={photo.id} >
                            <div 
                                onClick={fullWidthOverlay} 
                                data-id={photo.id} 
                                className="overlay w-full h-full absolute md:bg-black hover:md:opacity-0 opacity-50 transition ease-in-out delay-400 top-0 left-0"
                            ></div>
                            
                            <picture>
                                <source srcSet={photo.url} type="image/webp" />
                                <img 
                                    id={`img-${photo.id}`}
                                    onClick={fullWidth}
                                    className={`w-full block img-${photo.id}`} 
                                    src={photo.url}
                                    alt={photo.title} 
                                />
                            </picture>
                        </div>
                    ))
                }
            </div>

            <Modal />;

            <Pagination links={props.photos?.links} />
        </div>
    )
}