import React from 'react';

const Footer = () => {
    return (
        <div className="bg-neutral text-neutral-content ">
            <footer className=" footer items-center p-4 container md:px-20 mx-auto">
                <div className="items-center grid-flow-col">
                    <div className="bg-white rounded-full">
                        <img className='h-8 p-1' src="https://www.freeiconspng.com/uploads/file-sharing-share-sharing-social-media-icon--28.png" alt="" />
                    </div>
                    <p>Copyright © 2022 - All right reserved || shakeeb</p>
                </div>
                <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a href='https://www.facebook.com/mdshakeebltd'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;