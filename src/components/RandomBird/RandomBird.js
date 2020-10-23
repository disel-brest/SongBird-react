import React from 'react';
import './RandomBird.scss';

function RandomBird() {
    return (
        <section className="random-bird">
            <div className="bird">
                <div className='bird__main'>
                    <div className='bird__foto'>
                        <img src={require(`../../assets/images/random-bird.jpg`)} alt="" />
                    </div>
                    <div className='bird__details'>
                        <div className='bird__title'><h3>Журавль</h3></div>
                        <div className='bird__audio'>
                            <audio 
                            src="https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501461-190616_08.13h_koekoek_brabantse%20biesbosch%20jantjesplaat_roep_1%20ex_ad%20m_ter%20plaatse%20zingend_gezien_.mp3" 
                            // src="XC477551-190503-Troglodyte mignon@Sacharewo.mp3" 
                            controls
                            ></audio>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RandomBird;