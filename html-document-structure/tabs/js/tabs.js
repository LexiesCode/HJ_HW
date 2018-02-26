'use strict';
const tabs = document.querySelector('#tabs');
const content = tabs.querySelector('.tabs-content');
const articles = content.children;
const tabsList = tabs.querySelector('.tabs-nav');
const demoTab = tabsList.firstElementChild;

// Clone tabs and remove demo
for (let article of articles) {
    let tab = demoTab.cloneNode(true);
    tabsList.appendChild(tab);
    tab.firstElementChild.textContent = article.dataset.tabTitle;
    tab.firstElementChild.classList.add(article.dataset.tabIcon);
}
tabsList.removeChild(demoTab);

// Select first tab
switchArticle(tabsList.firstElementChild);

// Subscribe on tabs
tabsList.addEventListener('click', tabClickHandler);

function tabClickHandler(event) {
    switchArticle(event.target);
}

function switchArticle(activeTab) {
    for (let tab of tabsList.children) {
        tab.classList.remove('ui-tabs-active');
    }
    activeTab.classList.add('ui-tabs-active');
    activeTab.parentElement.classList.add('ui-tabs-active');
    let currentTitle = activeTab.textContent;
    for (let article of articles) {
        if (article.dataset.tabTitle === currentTitle) {
            article.classList.remove('hidden');
        } else {
            article.classList.add('hidden');
        }
    }
}