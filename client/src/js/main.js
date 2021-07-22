document.addEventListener('DOMContentLoaded', (event) => {
  InitializeClient();
});

const InitializeClient = () => {
  let peerId;
  let username;
  let conn;

  const peer = new Peer({
    host: '192.168.100.77',
    port: 9000,
    path: '/peerjs',
    debug: 3,
    config: {
      'iceServers': [
        { url: 'stun:stun1.l.google.com:19302' }
      ]
    }
  });

  peer.on('open', () => {
    document.querySelector(".messenger-form__my-peer-id").innerHTML = peer.id;
  })

  peer.on('connection', (connection) => {
    conn = connection;
    peerId = connection.peer;
    console.log(`Connection: ${conn}`)

    conn.on('data', handleMessage);


    document.querySelector(".messenger-form__connected-peer-notification--hidden").className = "messenger-form__connected-peer-notification";
    document.getElementById("peer-id").className += " hidden";
    document.getElementById("peer-id").value = peerId;
    document.querySelector(".messenger__status-bar--connected_peer").innerHTML = `💬 Chatting with ${connection.metadata.username}`;

  });

  peer.on('error', (err) => {
      alert("An error ocurred with peer: " + err);
      console.error(err);
  });


  /**
  * Appends the received and sent message to the listview
  * 
  * @param {Object} data 
  */
  function handleMessage(data) {
    var orientation = "text-left";

    // If the message is yours, set text to right !
    if(data.peerId == peerId){
        orientation = "text-right"
    }

    let messageHTML =  '<div class="message-body ' + orientation + '">';
    messageHTML += '<strong>'+ data.from +'</strong>';
    messageHTML += '<p class="message-text">'+ data.text +'</p>';
    messageHTML += '</div>';

    document.querySelector(".messages").innerHTML += messageHTML;
  }
  
  /**
   * Handle the send message button
   */
  document.querySelector(".send-message").addEventListener("click", function(){
    // Get the text to send
    const text = document.getElementById("message").value;

    // Prepare the data to send
    const data = {
        peerId: peerId,
        from: username, 
        text: text 
    };

    // Send the message with Peer
    conn.send(data);

    // Handle the message on the UI
    handleMessage(data);

    document.getElementById("message").value = "";
  }, false);


  /**
  * On click the connect button, initialize connection with peer
  */
  document.querySelector(".messenger-form__connect-btn").addEventListener("click", function(){
    username = document.getElementById("name").value || '🕵️ Anonymous user';
    peerId = document.getElementById("peer-id").value;

    if (peerId) {

      conn = peer.connect(peerId, {
          metadata: {
              'username': username
          },
          serialization: 'json'
      });

      conn.on('data', handleMessage);

      const data = {
        from: '', 
        text: `<strong>Server: </strong> 🎉 Yay! You are now in a peer-to-peer chat with ${username}.`
      };

      setTimeout(() => {
        conn.send(data)
      }, 2000)
    }else{
        alert("You need to provide a peer to connect with !");
        return false;
    }

    document.querySelector(".messenger-chat").className = "messenger-chat";
    document.querySelector(".messenger-form").className += " hidden";
  }, false);
}