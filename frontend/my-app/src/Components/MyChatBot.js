import { useEffect } from 'react';

const MyChatBot = () => {
  useEffect(() => {
    // Inject the first script
    const botpressScript = document.createElement('script');
    botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    // Inject the second script (config)
    const botpressConfig = document.createElement('script');
    botpressConfig.src = 'https://mediafiles.botpress.cloud/0014d546-8e66-425d-bca2-e1ee392f697f/webchat/v2.1/config.js';
    botpressConfig.async = true;
    document.body.appendChild(botpressConfig);

    // Clean up the scripts when the component unmounts
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(botpressConfig);
    };
  }, []);

  return null; // No visible component, the chatbot will appear on your website automatically
};

export default MyChatBot;
