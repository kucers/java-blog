/*Pytania
1. z watchem: pokazuja mi errory do poprawienia takie jak za duża ilosc tab
*/
'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
      for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
      }
  /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log("Link was clicked! ", articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log("Selector was found! ", targetArticle);
  /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  /* find all the articles and save them to variable: articles */
    let html = '';
  /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
        /* [DONE] get the article id */
        const articleId = article.getAttribute('id');
        /* [DONE] find the title element */        
        /* [DONE] get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* [DONE]create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' +articleTitle + '</span></a></li>';
        //console.log(linkHTML);
        /* [DONE] insert link into titleList */
        /*
        titleList.insertAdjacentHTML("beforeend", linkHTML)
        */
        /* [DONE] insert link into html variable */
        html = html + linkHTML;
        //console.log('zawartosc html ', html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log('links contains: ', links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('all articles', articles);
  /* START LOOP: for every article: */
  for(let article of articles){  
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector)
    console.log('tag List', tagList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('data-tags', articleTags);
    /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

  /* END LOOP: for every article: */
  }
}

generateTags();
