const slidedata = [
    {
      title: 'Experience the Beauty of the Ocean',
      subTitle: 'Buy your Aquarium Tickets today!',
      picUrl: 'https://cz-server-rungruch.azurewebsites.net/img/assets|main|hero1.jpg',
    },
    {
      title: 'Discover the Wonders of the Deep',
      subTitle: 'Get up close with our interactive exhibits',
      picUrl: 'https://cz-server-rungruch.azurewebsites.net/img/assets|main|hero2.jpg',
    },
    {
      title: 'Meet our Friendly Marine Life',
      subTitle: 'From dolphins to turtles, come say hi!',
      picUrl: 'https://cz-server-rungruch.azurewebsites.net/img/assets|main|hero3.jpg',
    },
  ];
    
let HeroSlide = {
    find: () => new Promise((resolve, reject) => resolve(slidedata) )
}
export default HeroSlide;
