var News = function () {

    return {

        //初始化新闻列表
        initNewsList: function (_keyword) {
            $("#paginationItem").html('');
            _initNewsList(1, pageSize, _keyword, _initPagination);
        },

        //初始化新闻详情页
        initNewsDetail: function (_newId) {
            var type = _getQueryString("type");
            var pathName = rootPath + (type == "hot" ? "/detailHotNews" : "/detailNews") + window.location.search;
            return $.ajax({
                type: 'get',
                url: pathName,
                url: pathName,
                success: function (data) {
                    var news = JSON.parse(data);
                    $("#h3Title").html(news.title);
                    $("#sDate").html(news.datetime);
                    $("#sAuthor").html(news.author || '锐风科技');
                    $(news.keywords.split('|')).each(function (i, key) {
                        var $keyword = $('<a href="#"/>');
                        $('li', $('#keywords')).append($keyword.html(key));
                    });
                    //news.imgpath && $(".accordion-img").html('<img src="' + news.imgpath + '">');
                    $(".accordion-inner").html(news.content);
                    return news;
                }
            });

        },

        //热门新闻
        hotNews: function (_pageNum) {

            var pathName = rootPath + "/hotNews?pageSize=" + _pageNum;
            $.ajax({
                type: 'get',
                url: pathName,
                success: function (data) {

                    var hotNews = JSON.parse(data);
                    $(hotNews).each(function (i, item) {
                        var $dl = $('<dl class="dl-horizontal" />');
                        var $dt = $('<dt><a href="#"><img  alt="" /></a></dt>');
                        $("img", $dt).attr("src", item.imgpath || 'assets/img/new/default.jpg');
                        var $dd = $('<dd><p><a href=""></a></p></dd>');
                        $("a", $dd).attr("href", "newsdetails.html?type=hot&newsid=" + item.newsid).html(item.title);
                        $dl.append($dt).append($dd);
                        $("#hotnews").append($dl);
                    });

                }
            });
        },

        products: function (argument) {

            var pathName = rootPath + "/product";
            $.ajax({
                type: 'get',
                url: pathName,
                success: function (data) {
                    var test = 2;
                    var products = JSON.parse(data);
                    $(products).each(function (i, item) {
                        var $li = $("<li/>");
                        var $a = $("<a target='_blank'/>").attr("href", item.link);
                        var $img = $('<img alt="" class="hover-effect" />').attr("src", item.imgpath || 'assets/img/new/default.jpg');
                        $a.append($img);
                        $li.append($a);
                        $("#products").append($li);
                    });

                }
            });
        }
    }
}();


var rootPath = "http://www.ruifenginfo.com",
    pageSize = 3;

//初始化新闻列表
function _initNewsList(_pageNum, _pageSize, _keyword, _callBack) {

    _pageNum = _pageNum || 1;
    _pageSize = _pageSize || pageSize;

    var pathName = rootPath + '/selectNews?pageNum=' + _pageNum + '&pageSize=' + _pageSize;
    $.ajax({
        type: 'post',
        url: pathName,
        data: {
            keyword: _keyword || ''
        },
        success: function (data) {

            var totalCount = 0;
            $("#newsList").html('');
            var newsList = JSON.parse(data);

            $(newsList).each(function (i, item) {

                totalCount = item.totalcount; //总记录数
                var $div = $('<div class="blog margin-bottom-30"/>');
                //标题
                var $h3 = $('<h3/>').html($('<a>').attr('href','/news/'+item.newsid+'.html').html(item.title));
                //日期、作者
                var $ul = $('<ul class="unstyled inline blog-info">');
                var $li = $('<li/>');
                $li.append('<i class="icon-calendar"></i>').append(item.datetime);
                $ul.append($li);
                $li = $('<li/>');
                $li.append('<i class="icon-pencil"></i>').append(item.author || '锐风科技');
                $ul.append($li);
                //关键字
                var $keywords = $('<ul class="unstyled inline blog-tags"><li><i class="icon-tags"></i></li></ul/>');
                $(item.keywords.split('|')).each(function (i, key) {
                    var $keyword = $('<a href="#"/>').bind("click", function () {
                        $("#txtKeyword").val(key);
                        News.initNewsList(key);
                    });
                    $keywords.append($keyword.html(key));
                });

                //图片
                var $divImg = $('<div class="blog-img" />');
                var $img = $('<img />').attr({
                    'src': item.imgpath || 'assets/img/new/default.jpg'
                });
                $divImg.append($img);
                //内容
                var $p = $("<p/>").append(item.content);
                //阅读更多
                var $pm = $("<p/>");
                //var $a = $('<a class="btn-u btn-u-small" />').attr("href", "newsdetails.html?newsid=" + item.newsid);
                var $a = $('<a class="btn-u btn-u-small" />').attr("href", "/news/" + item.newsid+".html");
                $a.html("阅读更多");
                $pm.append($a);

                $div.append($h3).append($ul).append($keywords).append($divImg).append($p).append($pm);

                $("#newsList").append($div);
            });

            if (_callBack) _callBack(totalCount, _keyword);
        }
    });
}

//初始化分页
function _initPagination(_totalCount, _keyword) {

    var pageCounts = Math.ceil(_totalCount / pageSize);
    $('#paginationItem').bootstrapPaginator({
        bootstrapMajorVersion: 3, //版本号。3代表的是第三版本
        currentPage: 1, //当前页数
        numberOfPages: pageSize, //显示页码数标个数
        totalPages: pageCounts, //总共的数据所需要的总页数
        onPageClicked: function (e, originalEvent, type, page) {
            //单击当前页码触发的事件。若需要与后台发生交互事件可在此通过ajax操作。page为目标页数。
            _initNewsList(page, pageSize, _keyword);
        }
    });
}


//获取参数
function _getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
