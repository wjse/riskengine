import "../../static/scss/icon-items.scss";
import React from "react";
import DashboardPanel from "../view/dashboard/panel";

export default class IconItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isToggle : true
        };

        this.height = 600;
    };

    toggle(){
        let isToggle = this.state.isToggle;
        this.setState({isToggle : !isToggle});
    };

    toggleBtn(){
        return (
            <div className="actions pull-right">
                <i className={"fa fa-" + (this.state.isToggle ? "chevron-down" : "chevron-up")} onClick={this.toggle.bind(this)}></i>
            </div>
        );
    };

    render(){
        return (
            <DashboardPanel title="图标参照" right={this.toggleBtn()} width={this.props.width} body={this.items()}/>
        );
    };

    items(){
        return (
            <div className="icon-items" style={{display : (this.state.isToggle ? "block" : "none") , height : this.height}}>
                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-adjust"></i>adjust</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-anchor"></i>anchor</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-archive"></i>archive</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-arrows"></i>arrows</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-arrows-h"></i>arrows-h</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-arrows-v"></i>arrows-v</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-asterisk"></i>asterisk</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-ban"></i>ban</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bar-chart-o"></i>bar-chart-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-barcode"></i>barcode</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bars"></i>bars</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-beer"></i>beer</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bell"></i>bell</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bell-o"></i>bell-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bolt"></i>bolt</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-book"></i>book</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bookmark"></i>bookmark</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bookmark-o"></i>bookmark-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-briefcase"></i>briefcase</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bug"></i>bug</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-building-o"></i>building-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bullhorn"></i>bullhorn</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-bullseye"></i>bullseye</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-calendar"></i>calendar</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-calendar-o"></i>calendar-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-camera"></i>camera</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-camera-retro"></i>camera-retro</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-caret-square-o-down"></i>caret-square-o-down</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-caret-square-o-left"></i>caret-square-o-left</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-caret-square-o-right"></i>caret-square-o-right</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-caret-square-o-up"></i>caret-square-o-up</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-certificate"></i>certificate</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-check"></i>check</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-check-circle"></i>check-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-check-circle-o"></i>check-circle-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-check-square"></i>check-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-check-square-o"></i>check-square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-circle"></i>circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-circle-o"></i>circle-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-clock-o"></i>clock-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cloud"></i>cloud</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cloud-download"></i>cloud-download</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cloud-upload"></i>cloud-upload</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-code"></i>code</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-code-fork"></i>code-fork</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-coffee"></i>coffee</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cog"></i>cog</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cogs"></i>cogs</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-comment"></i>comment</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-comment-o"></i>comment-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-comments"></i>comments</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-comments-o"></i>comments-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-compass"></i>compass</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-credit-card"></i>credit-card</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-crop"></i>crop</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-crosshairs"></i>crosshairs</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-cutlery"></i>cutlery</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-dashboard"></i>dashboard
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-desktop"></i>desktop</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-dot-circle-o"></i>dot-circle-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-download"></i>download</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-edit"></i>edit
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-ellipsis-h"></i>ellipsis-h</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-ellipsis-v"></i>ellipsis-v</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-envelope"></i>envelope</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-envelope-o"></i>envelope-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-eraser"></i>eraser</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-exchange"></i>exchange</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-exclamation"></i>exclamation</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-exclamation-circle"></i>exclamation-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-exclamation-triangle"></i>exclamation-triangle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-external-link"></i>external-link</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-external-link-square"></i>external-link-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-eye"></i>eye</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-eye-slash"></i>eye-slash</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-female"></i>female</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-fighter-jet"></i>fighter-jet</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-film"></i>film</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-filter"></i>filter</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-fire"></i>fire</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-fire-extinguisher"></i>fire-extinguisher</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-flag"></i>flag</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-flag-checkered"></i>flag-checkered</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-flag-o"></i>flag-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-flash"></i>flash
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-flask"></i>flask</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-folder"></i>folder</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-folder-o"></i>folder-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-folder-open"></i>folder-open</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-folder-open-o"></i>folder-open-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-frown-o"></i>frown-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-gamepad"></i>gamepad</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-gavel"></i>gavel</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-gear"></i>gear
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-gears"></i>gears
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-gift"></i>gift</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-glass"></i>glass</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-globe"></i>globe</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-group"></i>group
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-hdd-o"></i>hdd-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-headphones"></i>headphones</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-heart"></i>heart</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-heart-o"></i>heart-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-home"></i>home</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-inbox"></i>inbox</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-info"></i>info</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-info-circle"></i>info-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-key"></i>key</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-keyboard-o"></i>keyboard-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-laptop"></i>laptop</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-leaf"></i>leaf</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-legal"></i>legal
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-lemon-o"></i>lemon-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-level-down"></i>level-down</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-level-up"></i>level-up</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-lightbulb-o"></i>lightbulb-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-location-arrow"></i>location-arrow</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-lock"></i>lock</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-magic"></i>magic</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-magnet"></i>magnet</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-mail-forward"></i>mail-forward
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-mail-reply"></i>mail-reply
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-mail-reply-all"></i>mail-reply-all</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-male"></i>male</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-map-marker"></i>map-marker</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-meh-o"></i>meh-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-microphone"></i>microphone</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-microphone-slash"></i>microphone-slash</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-minus"></i>minus</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-minus-circle"></i>minus-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-minus-square"></i>minus-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-minus-square-o"></i>minus-square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-mobile"></i>mobile</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-mobile-phone"></i>mobile-phone
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-money"></i>money</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-moon-o"></i>moon-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-music"></i>music</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-pencil"></i>pencil</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-pencil-square"></i>pencil-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-pencil-square-o"></i>pencil-square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-phone"></i>phone</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-phone-square"></i>phone-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-picture-o"></i>picture-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-plane"></i>plane</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-plus"></i>plus</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-plus-circle"></i>plus-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-plus-square"></i>plus-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-plus-square-o"></i>plus-square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-power-off"></i>power-off</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-print"></i>print</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-puzzle-piece"></i>puzzle-piece</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-qrcode"></i>qrcode</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-question"></i>question</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-question-circle"></i>question-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-quote-left"></i>quote-left</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-quote-right"></i>quote-right</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-random"></i>random</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-refresh"></i>refresh</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-reply"></i>reply</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-reply-all"></i>reply-all</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-retweet"></i>retweet</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-road"></i>road</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-rocket"></i>rocket</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-rss"></i>rss</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-rss-square"></i>rss-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-search"></i>search</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-search-minus"></i>search-minus</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-search-plus"></i>search-plus</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-share"></i>share</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-share-square"></i>share-square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-share-square-o"></i>share-square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-shield"></i>shield</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-shopping-cart"></i>shopping-cart</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sign-in"></i>sign-in</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sign-out"></i>sign-out</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-signal"></i>signal</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sitemap"></i>sitemap</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-smile-o"></i>smile-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort"></i>sort</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-alpha-asc"></i>sort-alpha-asc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-alpha-desc"></i>sort-alpha-desc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-amount-asc"></i>sort-amount-asc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-amount-desc"></i>sort-amount-desc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-asc"></i>sort-asc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-desc"></i>sort-desc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-down"></i>sort-down
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-numeric-asc"></i>sort-numeric-asc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-numeric-desc"></i>sort-numeric-desc</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sort-up"></i>sort-up
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-spinner"></i>spinner</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-square"></i>square</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-square-o"></i>square-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star"></i>star</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star-half"></i>star-half</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star-half-empty"></i>star-half-empty
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star-half-full"></i>star-half-full
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star-half-o"></i>star-half-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-star-o"></i>star-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-subscript"></i>subscript</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-suitcase"></i>suitcase</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-sun-o"></i>sun-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-superscript"></i>superscript</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tablet"></i>tablet</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tachometer"></i>tachometer</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tag"></i>tag</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tags"></i>tags</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tasks"></i>tasks</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-terminal"></i>terminal</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-thumb-tack"></i>thumb-tack</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-thumbs-down"></i>thumbs-down</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-thumbs-o-down"></i>thumbs-o-down</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-thumbs-o-up"></i>thumbs-o-up</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-thumbs-up"></i>thumbs-up</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-ticket"></i>ticket</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-times"></i>times</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-times-circle"></i>times-circle</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-times-circle-o"></i>times-circle-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-tint"></i>tint</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-toggle-down"></i>toggle-down
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-toggle-left"></i>toggle-left
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-toggle-right"></i>toggle-right
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-toggle-up"></i>toggle-up
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-trash-o"></i>trash-o</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-trophy"></i>trophy</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-truck"></i>truck</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-umbrella"></i>umbrella</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-unlock"></i>unlock</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-unlock-alt"></i>unlock-alt</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-unsorted"></i>unsorted
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-upload"></i>upload</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-user"></i>user</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-users"></i>users</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-video-camera"></i>video-camera</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-volume-down"></i>volume-down</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-volume-off"></i>volume-off</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-volume-up"></i>volume-up</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-warning"></i>warning
                    <span className="text-muted">(alias)</span>
                </div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-wheelchair"></i>wheelchair</div>

                <div className="fa-hover col-md-3 col-sm-4"><i className="fa fa-wrench"></i>wrench</div>
            </div>
        );
    };
};