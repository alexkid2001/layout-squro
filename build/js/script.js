{
    
  new SimpleSlider('.slider', {
    autoplay: true,
    delay: 7000,
    class: {
      wrapper: 'slider__wrapper',
      slide: 'slider__item',
      pagination: 'slider__nav',
      paginationItem: 'slider__dot'
    }
  });


  const menuIcon = document.querySelector('.header__menu-icon');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const body = document.querySelector('body');
   
  const menuSubItems = document.querySelectorAll('.menu__item_sub');
  const menuItems = document.querySelectorAll('.menu > .menu__item');

  const disactiveAll = () => {
    menuItems.forEach(item => {
      item.classList.remove('active');
    });
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      disactiveAll();
      item.classList.add('active');
    })
  });

  menuSubItems.forEach(item => {
    item.addEventListener('click', () => {
      event.stopPropagation();
      item.classList.toggle('open');
      console.log('click on .menu__item_sub');
    });
  });

  const submenuItems = document.querySelectorAll('.menu__item_sub .menu__item');
  
  submenuItems.forEach(item => {
    item.addEventListener('click', () => {
      event.stopPropagation();
      item.closest('.menu__item_sub').classList.remove('open');
      if (item.closest('.header__mobile-menu')) {
        mobileMenu.classList.toggle('active');
      }
      console.log('click on .menu__item_sub .menu__item');
    });
  });

  
  menuIcon.addEventListener('click', () => {
    event.stopPropagation();
    mobileMenu.classList.toggle('active');
    if (mobileMenu.classList.contains('active')) {
      body.classList.add('overflow');
    } else {
      body.classList.remove('overflow');
    }
  });

  const closeMobileMenu = () => {
    mobileMenu.classList.remove('active');
    body.classList.remove('overflow');
  }


  document.addEventListener('click', () => {
    const target = event.target;
    const isMobileMenu = target.closest('.header__mobile-menu');
    const isMenuItem = target.classList.contains('menu__item') || target.closest('.menu__item');
    const isSubmenuItem = target.classList.contains('menu__item_sub') || target.parentNode.parentNode.classList.contains('menu__item_sub');
    const menu = target.closest('.menu');
    
    if (isMobileMenu && isMenuItem && !isSubmenuItem) {
      closeMobileMenu();
    }

    if (!menu) {
      menuSubItems.forEach(item => {
        item.classList.remove('open');
      })
      closeMobileMenu();
    }
    
  });

}


