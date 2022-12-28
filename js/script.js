/*Pytania
1. z watchem: pokazuja mi errory do poprawienia takie jak za duza ilosc tab
*/
'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  //console.log('Link was clicked!');
  //console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  //console.log("Link was clicked! ", articleSelector);
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  //console.log("Selector was found! ", targetArticle);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagsActiveSelector = '.post-tags .list.active',
  optArticleAuthorSelector = '.post-author',
  optArticleAuthorActiveSelector = '.post-author.active',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-' ;

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* find all the articles and save them to variable: articles */
  let html = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE]create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagClass(count, params){
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  return optCloudClassPrefix+classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('all articles', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector)
    //console.log('tag List', tagList);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log('data-tags', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        //console.log(allTags);
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    
    tagList.innerHTML = html;
    //console.log('tag list: ',tagList);  
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  //console.log('list', tagList);
  // /* [NEW] add html from allTags to tagList */
  // //tagList.innerHTML = allTags.join(' ');
  console.log('allTags',allTags);
  /*create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagParams',tagsParams);
  let allTagsHTML = '';
  /* START LOOP: for each tag in allTags*/
  for (let tag in allTags) {
    allTagsHTML +='<li><a href="#tag-' + tag + '" class="'+ calculateTagClass (allTags[tag], tagsParams) +'">'+ tag + ' (' + allTags[tag] + ')</a></li>';
    //const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="'+ calculateTagClass (allTags[tag], tagsParams) +'">'+ tag + ' (' + allTags[tag] + ')</a></li>';
    //console.log('tagLinkHTML', tagLinkHTML);
  }
  
  //console.log(allTagsHTML);
  tagList.innerHTML = allTagsHTML;
  //console.log('taglist',tagList);
}
function calculateTagsParams(tags){
  
  let tagsValues = '';
  for (let tag in tags){
    //console.log(tag + 'is used ' + tags[tag] + ' times')
    tagsValues = tagsValues + tags[tag];
  }
  //console.log(tagsValues);
  let min = Math.min(...tagsValues);
  //console.log(min);
  let max = Math.max(...tagsValues);
  //console.log(max);
  let result = [];
  result.max = max;
  result.min = min;
  //console.log(result);
  return result;
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href const', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '')
  //console.log(tag);
  /* find all tag links with class active */
  const tagsActive = document.querySelectorAll(optArticleTagsActiveSelector);
  //console.log(tagsActive);
  /* START LOOP: for each active tag link */
  for (let tagActive of tagsActive) {
    /* remove class active */
    tagActive.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* [?] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log('tag links:' ,tagLinks);
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('all articles', articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector)
    //console.log('tag List', tagList);
    /* make html variable with empty string */
    //let html = '';
    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log('data-author', articleAuthor);
    /* split tags into array */
    //const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    //for(let author of articleTagsArray){
    /* generate HTML of the link */
    const linkHTML = '<a href="#' + articleAuthor + '">' + articleAuthor + '</a>';
    //console.log('html', linkHTML);
    /* add generated code to html variable */
    //html = html + linkHTML;      
    /* END LOOP: for each tag */
    //}
    /* insert HTML of all the links into the tags wrapper */
    authorList.innerHTML = linkHTML;
    //console.log('author list: ',authorList);  
    /* END LOOP: for every article: */
  }
}

generateAuthors();

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('clicked element: ',clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log('href const',href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#', '')
  //console.log(author);
  /* find all tag links with class active */
  const authorsActive = document.querySelectorAll(optArticleAuthorActiveSelector);
  console.log(authorsActive);
  /* START LOOP: for each active tag link */
  for (let authorActive of authorsActive) {
    /* remove class active */
    authorActive.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* [?] find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tag links:', authorLinks);
  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
