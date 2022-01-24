const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");


// ####################################################################################################################################
// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 

// URL ENTER
let url = "https://www.imdb.com/title/tt9784798/?ref_=tt_rvi_tt_i_14";

//------------------------------------------------------------------------------------------------------------------------------------

//Web serie - w and movie - m
let cast = "m";

// ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? 
// ####################################################################################################################################



(async () => {
  let response = await request(url);
  let $ = cheerio.load(response);
  let title = $(
    'div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"] > h1'
  ).text();
  let year = $('li[class="ipc-inline-list__item"] > span:first').text();
  let image =$('img[class="ipc-image"]').attr('src');
  let imdb_rate = $(
    'div[class="AggregateRatingButton__Rating-sc-1ll29m0-2 bmbYRW"] > span:first'
  ).text();
  let pop = $(
    'div[class="AggregateRatingButton__TotalRatingAmount-sc-1ll29m0-3 jkCVKJ"]:first'
  ).text();
  let length = $(
    'ul[class="ipc-inline-list ipc-inline-list--show-dividers TitleBlockMetaData__MetaDataList-sc-12ein40-0 dxizHm baseAlt"] > li[class="ipc-inline-list__item"]:nth-child(3)'
  ).text();
  let story = $(
    'div[class="ipc-html-content ipc-html-content--base"] > div'
  ).text();
  story = story.replace(/[']/g , '');
  story = story.replace(/["]/g , '');
  story = story.replace(/\n/g, '');
  let gen = $('#__next > main > div > section.ipc-page-background.ipc-page-background--base.MainDetailPageLayout__StyledPageBackground-sc-13rp3wh-0.hsughJ > section > div:nth-child(4) > section > section > div.Hero__MediaContentContainer__Video-sc-kvkd64-2.gVRpZB > div.Hero__ContentContainer-sc-kvkd64-10.frcskz > div.Hero__MetaContainer__Video-sc-kvkd64-4.jMerKX > div.GenresAndPlot__ContentParent-sc-cum89p-8.hTqGWn.Hero__GenresAndPlotContainer-sc-kvkd64-11.iEHpKn > div > a:nth-child(1) > span').text()

  if (cast == "m") {
    let obj = {
      name: title,
      year: year,
      length : length,
      imdb: imdb_rate,
      popularity: pop,
      genre: gen,
      language: "Hindi",
      story: story,
      poster: image,
      download_links: [""],
      type: "hollywood",
    };
    let content2 = JSON.stringify(obj);
    try {
      fs.writeFileSync("test.json", content2);
      //file written successfully
      console.log("File Made ------> Movie");
    } catch (err) {
      console.error(err);
    }
  } else {
    obj = {
      name: title,
      year: year,
      imdb: imdb_rate,
      popularity: pop,
      genre: gen,
      language: "Hindi",
      story: story,
      poster: image,
      download_links: ["", "", ""],
      type: "web",
      season: 1,
      episodes: 10,
    };
    let content = JSON.stringify(obj);
    // console.log(json);
    try {
      fs.writeFileSync("test.json", content);
      //file written successfully
      console.log("File Made ------> Web-series");
    } catch (err) {
      console.error(err);
    }
  }
})();
