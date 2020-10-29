// Get hash from URL.
const myPeerId = location.hash.slice(1);

// Connect to Peer server.
peer = new Peer(myPeerId, {
  host: 'glajan.com',
  port: 8443,
  path: '/myapp',
  secure: true,
});

// Print peer id on connection 'open' event.
peer.on('open', (id) => {
  const myPeerIdEl = document.querySelector('.my-peer-id');
  myPeerIdEl.innerText = id;
});
peer.on('error', (errorMessage) => {
  console.error(errorMessage);
});

// Event listener for click "Refresh list".
const listPeersButtonEl = document.querySelector('.list-all-peers-button');
const peerListDiv = document.querySelector('.peers');
listPeersButtonEl.addEventListener('click', () => {
  peer.listAllPeers((peers) => {
    let str = '<ul>';
    const listItems = peers
      .filter((peerId) => peerId !== peer._id)
      .forEach((listItems) => {
        str +=
          `<li><button class="connect-button peerId-${peer}">` +
          listItems +
          '</button></li>';
      });
    str += '</ul>';
    peerListDiv.innerHTML = str;
  });
});
