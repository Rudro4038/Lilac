import { useEffect, useRef } from 'react';

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      // console.log('Attempting to initialize upload widget...');
      // console.log('window.cloudinary:', window.cloudinary);
      // console.log('uploadButtonRef.current:', uploadButtonRef.current);
      
      if (!window.cloudinary) {
        console.error('Cloudinary not loaded! Make sure the script is included in index.html');
        return;
      }

      if (uploadButtonRef.current) {
        // console.log('Creating upload widget with config:', uwConfig);
        
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
          // console.log('Upload widget callback:', { error, result });
          
          if (error) {
            console.error('Upload error:', error);
            return;
          }
          
          if (result && result.event === 'success') {
            // console.log('Upload successful oise:', result.info);
            setPublicId(result.info.public_id);

          }
        });

        // console.log('Upload widget created:', uploadWidgetRef.current);

        // Add click event to open widget
        const handleUploadClick = (e) => {
          e.preventDefault();
          // console.log('Upload button clicked!');
          
          if (uploadWidgetRef.current) {
            // console.log('Opening upload widget...');
            uploadWidgetRef.current.open();
          } else {
            console.error('Upload widget not initialized!');
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          if (buttonElement) {
            buttonElement.removeEventListener('click', handleUploadClick);
          }
        };
      } else {
        console.error('Button ref not available!');
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(initializeUploadWidget, 100);
    
    return () => clearTimeout(timer);
  }, [uwConfig, setPublicId]);

  return (
    <button 
      ref={uploadButtonRef} 
      id="upload_widget" 
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
      type="button"
    >
      Upload Images
    </button>
  );
};

export default CloudinaryUploadWidget;
