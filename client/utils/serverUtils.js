module.exports = {
  startupMessage: (networkInterfaceData, port) => {
    // let alias = 0;
    // if (typeof networkInterfaceData === 'object') {
    //   Object.keys(networkInterfaceData).map((InterfaceNames) => {
    //     networkInterfaceData[InterfaceNames].map((interfaceName) => {
    //       if (!(interfaceName?.family === 'IPv4' && interfaceName?.internal === false)) {
    //         return;
    //       } else {
    //         console.log(`FOUND A VALID IPv4 AND EXTERNAL ADDRESS: ${interfaceName?.address}`)
    //       }
          
    //       console.log("-------------------------------------------------------");
    //       console.log("Hello World! Server is now running...");
    //       console.log("");
    //       console.log("AVAILABLE INTERFACES:");
    //       console.log("");
    //       console.log(`HTTP: https://localhost:${port?.http}`);
    //       console.log(`HTTPS: https://localhost:${port?.https}`);
  
    //       if (alias >= 1) {
    //           console.log("Multiple ipv4 addreses were found ... ");
    //           // this single interface has multiple ipv4 addresses
    //           console.log(`${InterfaceNames} : ${alias}, https://${interfaceName?.address}:${port?.https}`);
    //       } else {
    //           // this interface has only one ipv4 adress
    //           console.log(`${InterfaceNames} https://${interfaceName?.address}:${port?.https}`);
    //       }
  
    //       ++alias;
    //     });
    //   });
    //   console.log("-------------------------------------------------------");
    // } else {
    //   console.log(`Valid network interface not found: ${networkInterfaceData}`)
    // }
    console.log("Skipping")
  }
}