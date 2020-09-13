var scriptProp =  PropertiesService.getScriptProperties().getProperties();
var trelloKey = scriptProp.TRELLO_API_KEY;
var trelloToken = scriptProp.TRELLO_TOKEN;
var username = scriptProp.TRELLO_USERNAME;
var trelloBaseURL = scriptProp.TRELLO_BASE_URL;
const webhookURL = scriptProp.webhookURL;

function getBoardList(){
  var url = 'https://api.trello.com/1/members/' + username + '/boards?key=' + trelloKey + '&token=' + trelloToken + '&fields=name';
  var options = {
    'method' : 'get',
    'muteHttpExceptions' : true
  }
  //Logger.log(UrlFetchApp.fetch(url, options));
}
function addList(){//顧客にlistを作る
  var boardId = '5f3e4fb0fb2e992e4b2398b9';
  var url = 'https://api.trello.com/1/boards/' + boardId + '/lists/?key=' + trelloKey + '&token=' + trelloToken;
  /*var options = {
    'method' : 'post',
    'muteHttpExceptions' : true,
    'payload' : {
      'name' : 'Test List',
      'pos' : 'top'
    }
  }*/
  //Logger.log(UrlFetchApp.fetch(url, options));
}

function addCard(customer){
  var listId = '5f420e2b57bfe48fd04031a5';
  var url = 'https://api.trello.com/1/cards/?key=' + trelloKey + '&token=' + trelloToken;
  var options = {
    'payload' : {
      'name'      : customer.name + '様: ' + customer.menu,
      'desc'      : customer.mail + '\n' + customer.contract + '\n'
      + 'プラン: '+ customer.menu + '\n'
      + 'キャラ：' + customer.personNum + '\n'
      + 'size: ' + customer.size + '\n'
      + '画像形式: ' + customer.pngjpg + '\n'
      + '背景: ' + customer.background + '：' + customer.bgImage + '\n'
      + 'アングル: ' + customer.angle + '：' + customer.angleImage + '\n'
      + 'ポーズ: ' + customer.pause + '：' + customer.pauseImage + '\n'
      + 'コメント: ' + customer.description,
      'due'       : '',
      'idList'    : listId,
      'urlSource' : ''
    }
  }
  Logger.log(UrlFetchApp.fetch(url, options));
}


function getValue(){  
  var notifySheet = SpreadsheetApp.getActiveSpreadsheet();
  var active_sheet = SpreadsheetApp.getActiveSheet();
  var my_cell = active_sheet.getActiveCell();
  var active_sheet_column = my_cell.getColumn();
  var rowNum = my_cell.getRow();
  console.log(rowNum);
  if (notifySheet.getRange('D' + rowNum).getValue() == "アイコン用イラスト"){
    var customer = {
      mail: notifySheet.getRange('B' + rowNum).getValue(),
      name: notifySheet.getRange('C' + rowNum).getValue(),
      menu: notifySheet.getRange('D' + rowNum).getValue(),
      contract: notifySheet.getRange('E' + rowNum).getValue(),
      personNum: notifySheet.getRange('F' + rowNum).getValue(),
      size: notifySheet.getRange('G' + rowNum).getValue(),
      pngjpg: notifySheet.getRange('H' + rowNum).getValue(),
      background: notifySheet.getRange('I' + rowNum).getValue(),
      bgImage: notifySheet.getRange('J' + rowNum).getValue(),
      illust: notifySheet.getRange('K' + rowNum).getValue(),
      illustImage: notifySheet.getRange('L' + rowNum).getValue(),
      angle: notifySheet.getRange('M' + rowNum).getValue(),
      angleImage: notifySheet.getRange('N' + rowNum).getValue(),
      pause: notifySheet.getRange('O' + rowNum).getValue(),
      pauseImage: notifySheet.getRange('P' + rowNum).getValue(),
      description: notifySheet.getRange('Q' + rowNum).getValue()
    };
  }else{
    var customer = {
      mail: notifySheet.getRange('B' + rowNum).getValue(),
      name: notifySheet.getRange('C' + rowNum).getValue(),
      menu: notifySheet.getRange('D' + rowNum).getValue(),
      contract: notifySheet.getRange('E' + rowNum).getValue(),
      personNum: notifySheet.getRange('R' + rowNum).getValue(),
      size: notifySheet.getRange('S' + rowNum).getValue(),
      pngjpg: notifySheet.getRange('T' + rowNum).getValue(),
      background: notifySheet.getRange('U' + rowNum).getValue(),
      bgImage: notifySheet.getRange('V' + rowNum).getValue(),
      illust:  notifySheet.getRange('W' + rowNum).getValue(),
      illustImage: notifySheet.getRange('X' + rowNum).getValue(),
      angle: notifySheet.getRange('Y' + rowNum).getValue(),
      angleImage: notifySheet.getRange('Z' + rowNum).getValue(),
      pause: notifySheet.getRange('AA' + rowNum).getValue(),
      pauseImage: notifySheet.getRange('AB' + rowNum).getValue(),
      description: notifySheet.getRange('AC' + rowNum).getValue()
    }
  }
  console.log(customer);
  addCard(customer);
  mailToSouun3(customer);
  discordAlart(customer);
}



function mailToSouun3(customer){
    const address = 'souun3@gmail.com';
    const subject = 'イラスト受注';
    var body = 'mail:' + customer.mail + '\n' + 'name: ' + customer.name +'\n\n 案件を受注しました。Trelloボードを確認してください。'
    MailApp.sendEmail(address, subject, body);
}


function discordAlart(customer){
    var payload = {
      'token': scriptProp.DISCORD_TOKEN,
      'username': 'channel',
      'channel': '#受注',
      'content': '受注しました。Trelloボードを確認してください。',
  }
    var param = {
      'method': 'POST',
      'payload': payload,
  }
  Logger.log(UrlFetchApp.fetch(webhookURL, param));
}



