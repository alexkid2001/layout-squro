{
  const menuItems = document.querySelectorAll('.menu__item_sub');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.add('open');
    });
  });

  const submenuItems = document.querySelectorAll('.menu__item_sub .menu__item');
  
  submenuItems.forEach(item => {
    item.addEventListener('click', () => {
      item.closest('.menu__item_sub').classList.remove('open');
      event.stopPropagation();
    });
  });

  const menuIcon = document.querySelector('.header__menu-icon');
  const mobileMenu = document.querySelector('.header__mobile-menu');
  const body = document.querySelector('body');
  menuIcon.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
      body.classList.add('overflow');
    } else {
      body.classList.remove('overflow');
    }

  });

}