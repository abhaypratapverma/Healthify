import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCallPage = () => {
  const { roomId } = useParams();
  const callContainerRef = useRef(null);

  useEffect(() => {
    const appID = 526567849; // Replace with your real AppID
    const serverSecret = 'a91818063789ba3a259c5d0f378872ec'; // Replace with your real ServerSecret

    const userID = String(Math.floor(Math.random() * 10000));
    const userName = "GuestUser"; // You can fetch actual username here

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: callContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  }, [roomId]);

  return <div ref={callContainerRef} style={{ width: '100%', height: '100vh' }}></div>;
};

export default VideoCallPage;
