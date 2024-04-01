const newsdata = [
    {
      id:'1',
      eventName:'Dolphin Presentation',
      eventLocation:'Center Dome',
      eventtime:'3:00 PM',
      eventShortHeadlline:'Dolphins are the most intelligent creatures on earth',
      animalUrl:'https://cz-server-rungruch.azurewebsites.net/img/assets|main|dolphin.png',
    },
    {
        id:'2',
        eventName:'Penguin Presentation',
        eventLocation:'Penguin Ice playground',
        eventtime:'11:00 AM',
        eventShortHeadlline:'Penguins are the most adorable creatures on earth',
        animalUrl:'https://cz-server-rungruch.azurewebsites.net/img/assets|main|penguin.png',
    },
    {
        id:'3',
        eventName:'Dive Wth Sharks',
        eventLocation:'Shark Walk',
        eventtime:'12:00 PM',
        eventShortHeadlline:'Sharks are the most dangerous creatures on earth',
        animalUrl:'https://cz-server-rungruch.azurewebsites.net/img/assets|main|shark.png',
    }
  ];
    
let News = {
    find: () => new Promise((resolve, reject) => resolve(newsdata) )
}
export default News;
