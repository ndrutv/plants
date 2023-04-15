addEventListener('DOMContentLoaded', () => {    
    // Burger menu
    const navList = document.querySelector('.nav__list');
    const navItem = document.querySelectorAll('.nav__item');
    const navBurger = document.querySelector('.header__burger');
    const navOverlay = document.querySelector('.header__burger-overlay');

    const navToggle = () => {
        // исправить ошибку для ПК
        // отключить прокрутку
        navOverlay.classList.toggle('header__burger-overlay_active');
        navBurger.classList.toggle('header__burger_active');
        navList.classList.toggle('nav__list_active');
    };
    
    navBurger.addEventListener('click', (e) => {
        e.preventDefault;
        
        navToggle();
    });

    navItem.forEach((e) => {
        e.addEventListener('click', () => {
            e.preventDefault;
            
            navToggle();
        });
    });

    // Fixed menu
    // const header = document.querySelector('.header');
    // window.addEventListener('scroll', () => {
    //     if ((window.pageYOffset) > 150) {
    //         header.setAttribute('style', 'height: 66px');
    //         document.querySelector('.main').setAttribute('style', 'padding: 30px 0 0');
    //     } else {
    //         header.removeAttribute('style');
    //         document.querySelector('.main').removeAttribute('style');
    //     }
    // });

    // Services Filter
    const btnService = document.querySelectorAll('.btn_service');

    btnService.forEach((e) => {
        e.addEventListener('click', (e) => {
            e.preventDefault;
            
            e.target.classList.toggle('btn_service_active');

            const active = document.querySelectorAll('.btn_service_active');
            const disabled = document.querySelectorAll('.btn_service:not(.btn_service_active)');

            if ( active.length >= 2 ) {
                disabled.forEach((e) => {
                    e.setAttribute('disabled', 'disabled');
                    e.classList.add('btn_service_disabled');
                });
            } else {
                disabled.forEach((e) => {
                    e.removeAttribute('disabled', 'disabled');
                    e.classList.remove('btn_service_disabled');
                });
            }

            // составляем список всех фильтров
            const allFilters = [];

            active.forEach((e) => {
                allFilters.push(e.value);
            });

            // фильтруем карточки
            const serviceItems = document.querySelectorAll('.service__item');

            serviceItems.forEach((e) => {
                if (allFilters.length === 0) {
                    e.classList.remove('service__item_disabled');
                } else if (allFilters.every((j) => j !== e.getAttribute('data-service-type'))) {
                    e.classList.add('service__item_disabled');
                } else {
                    e.classList.remove('service__item_disabled');
                }
            });
        });
    });

    // Prices Accordion
    const priceOptions = document.querySelectorAll('.prices__option');
    const priceSummary = document.querySelectorAll('.prices__summary');

    priceSummary.forEach((e) => {
        e.addEventListener("click", () => {
            const option = e.parentElement.querySelector('.option__info');
            const activeOption = document.querySelectorAll('.option__info_active');

            if ( option.classList.contains('option__info_active') ) {
                option.classList.remove('option__info_active');
                
                priceOptions.forEach((e) => {
                    e.classList.remove('prices__option_active');
                });
            } else {
                activeOption.forEach((j) => {
                    j.classList.remove('option__info_active');
                    priceOptions.forEach((e) => {
                        e.classList.remove('prices__option_active');
                    });
                });
                
                option.classList.add('option__info_active');
                // console.log(option.parentElement);
                option.parentElement.classList.add('prices__option_active');
            }
        });
    });

    const btnPrices = document.querySelectorAll('.btn_option');

    btnPrices.forEach((e) => {
        e.addEventListener('click', () => {
            window.location.href = '#contacts';
        });
    });

    // Adresses Drop-down
    const optionsContainer = document.querySelector('.contacts__select');
    const optionsTrigger = document.querySelector('.contacts__select-trigger');
    const optionsList = document.querySelector('.contacts__select-options');
    const options = document.querySelectorAll('.contacts__option');
    const selectedOption = document.querySelector('.contacts__choise');
    const contactsInfo = document.querySelector('.contacts__info');
    const contactsCity = document.querySelector('.contacts__info__city-data');
    const contactsPhone = document.querySelector('.contacts__info__phone-data');
    const contactsAdress = document.querySelector('.contacts__info__adress-data');

    const contactsList = {
        canandaigua: ['Canandaigua, NY', '+1 585 393 0001', '151 Charlotte Street'],
        newyork: ['New York City', '+1 212 456 0002', '9 East 91st Street'],
        yonkers: ['Yonkers, NY', '+1 914 678 0003', '511 Warburton Ave'],
        sherrill: ['Sherrill, NY', '+1 315 908 0004', '14 WEST Noyes BLVD'],
    };

    // если City меняем выделение
    // если не City не меняем выделение

    optionsTrigger.addEventListener('click', () => {
        if (selectedOption.innerHTML === 'City') {
            optionsContainer.classList.toggle('contacts__select_active');
        } else {
            optionsContainer.classList.add('contacts__select_active');
        }
        
        optionsList.classList.toggle('contacts__select-options_active');
    });

    let telNum = '';

    options.forEach((e) => {
        e.addEventListener('click', () => {
            e.preventDefault;
            
            const result = e.getAttribute('data-value');

            selectedOption.innerText = contactsList[result][0];
            contactsCity.innerHTML = contactsList[result][0];
            contactsPhone.innerHTML = contactsList[result][1];
            contactsAdress.innerHTML = contactsList[result][2];
            telNum = contactsList[result][1];

            contactsInfo.classList.add('contacts__info_active');
            optionsList.classList.toggle('contacts__select-options_active');
        });
    });

    const btnContacts = document.querySelector('.btn_contacts');

    btnContacts.addEventListener('click', () => {
        console.log(telNum);
        window.location.href = 'tel:' + telNum;
    });
});