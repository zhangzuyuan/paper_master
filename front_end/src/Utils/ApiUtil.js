export default class ApiUtil{
    static URL_IP= "http://127.0.0.1:5000"
    static URL_USER_ROOT = "/user"
    static URL_PAPER_ROOT = "/article_base"
    static URL_TYPE_ROOT = "/type_base"
    static URL_ANALYSE_ROOT = "/article_analyse"

    // user
    static API_USER_GET_ALL_INFORMATION = ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/user_information";
    static API_USER_GET_USER =ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/user_information/"
    static API_USER_GET_USER_PICTURE =ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/user_picture/"
    static API_USER_SIGN_IN =ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/sign_in"
    static API_USER_SIGN_UP = ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/sign_up"
    static API_USER_SIGN_UP_PICTURE = ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/sign_up_picture"
    static API_USER_UPDATE_USER_INFORMATION = ApiUtil.URL_IP + ApiUtil.URL_USER_ROOT + "/user_update_information"

    //paper_information
    static API_PAPER_GET_ALL_BASE_INFORMATION = ApiUtil.URL_IP + ApiUtil.URL_PAPER_ROOT + "/article_information";
    static API_PAPER_GET_USER_ALL_BASE_INFORMATION = ApiUtil.URL_IP + ApiUtil.URL_PAPER_ROOT + "/article_information/";
    static API_PAPER_ADD_BASE = ApiUtil.URL_IP + ApiUtil.URL_PAPER_ROOT + '/add_article'
    static API_PAPER_ADD_BASE_FILE = ApiUtil.URL_IP + ApiUtil.URL_PAPER_ROOT + '/add_article_file'
    static API_PAPER_SHOW = ApiUtil.URL_IP + ApiUtil.URL_PAPER_ROOT + '/article_file_show/'

    //type_information
    static API_CONFERENCE_GET_ALL_INFORMATION = ApiUtil.URL_IP + ApiUtil.URL_TYPE_ROOT + '/conference_information'

    //paper_analyse
    static API_PAPER_ANALYSE_INFORMARION = ApiUtil.URL_IP + ApiUtil.URL_ANALYSE_ROOT +'/analyse_article/'
    static API_ADD_PAPER_ANALYSE = ApiUtil.URL_IP + ApiUtil.URL_ANALYSE_ROOT + '/upload_article'
}