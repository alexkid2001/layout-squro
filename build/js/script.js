{
  const menuIcon = document.querySelector('.header__menu-icon');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const body = document.querySelector('body');
  
  
  const menuItems = document.querySelectorAll('.menu__item_sub');
  menuItems.forEach(item => {
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


  document.addEventListener('click', () => {
    const target = event.target;
    const isMobileMenu = target.closest('.header__mobile-menu');
    const isMenuItem = target.classList.contains('menu__item') || target.closest('.menu__item');
    const isSubmenuItem = target.classList.contains('menu__item_sub') || target.parentNode.parentNode.classList.contains('menu__item_sub');
    const menu = target.closest('.menu');
    // const its_btnMenu = target == menuItems;
    // const menu_is_active = menu.classList.contains('open');
    console.log('target', target);
    console.log('isMobileMenu', isMobileMenu);
    console.log('isMenuItem', isMenuItem);
    console.log('isSubmenuItem', target.parentNode.parentNode.classList.contains('menu__item_sub'));
    console.log('menu', menu);
    
    if (isMobileMenu && isMenuItem && !isSubmenuItem) {
      mobileMenu.classList.remove('active');
    }

    if (!menu) {
      menuItems.forEach(item => {
        item.classList.remove('open');
      })
      mobileMenu.classList.remove('active');
    }
    console.log('Global Event');
    
  });

}