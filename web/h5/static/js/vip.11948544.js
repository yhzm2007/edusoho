(window.webpackJsonp=window.webpackJsonp||[]).push([["vip"],{"062f":function(e,t,i){"use strict";i("8e6e"),i("ac6a"),i("456d"),i("6762"),i("2fdb"),i("55dd");var s=i("bd86"),r=(i("7f7f"),i("c5f6"),i("8bdb")),n=i("763b"),a=i("2f62");function o(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}var c={components:{"e-class":r.a},filters:{courseListData:n.a},props:{courseList:{type:Object,default:{}},feedback:{type:Boolean,default:!0},index:{type:Number,default:-1},typeList:{type:String,default:"course_list"},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},moreType:{type:String,default:"normal"},vipName:{type:String,default:"会员"},levelId:{type:Number,default:1}},data:function(){return{type:"price",pathName:this.$route.name}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?o(i,!0).forEach((function(t){Object(s.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(i).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},Object(a.d)(["courseSettings"]),{sourceType:{get:function(){return this.courseList.sourceType}},sort:{get:function(){return this.courseList.sort}},lastDays:{get:function(){return this.courseList.lastDays}},limit:{get:function(){return this.courseList.limit}},categoryId:{get:function(){return this.courseList.categoryId}},courseItemData:{get:function(){return!this.courseList.items.length},set:function(){}},listObj:function(){return{type:"price",typeList:this.typeList,showStudent:!this.courseSettings||Number(this.courseSettings.show_student_num_enabled)}}}),watch:{sort:function(e){this.fetchCourse()},limit:function(e,t){if(t>e){var i=this.courseList.items.slice(0,e);this.courseList.items=i}else this.fetchCourse()},lastDays:function(e){this.fetchCourse()},categoryId:function(e){this.fetchCourse()},sourceType:function(e,t){e!==t&&(this.courseList.items=[]),this.fetchCourse()}},created:function(){this.pathName.includes("Setting")&&this.fetchCourse()},methods:{jumpTo:function(e){this.feedback&&("vip"===this.moreType?this.$router.push({name:"course_list"===this.typeList?"vip_course":"vip_classroom",query:{vipName:this.vipName,levelId:this.levelId}}):this.$router.push({name:"course_list"===this.typeList?"more_course":"more_class"}))},fetchCourse:function(){if("custom"!==this.sourceType){var e={sort:this.sort,limit:this.limit,lastDays:this.lastDays,categoryId:this.categoryId};this.$emit("fetchCourse",{index:this.index,params:e,typeList:this.typeList})}}}},l=i("2877"),u=Object(l.a)(c,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.courseList.items.length?i("div",{staticClass:"e-course-list"},[i("div",{staticClass:"e-course-list__header"},[i("div",{staticClass:"clearfix"},[i("span",{staticClass:"e-course-list__list-title text-overflow"},[e._v(e._s(e.courseList.title))]),i("span",{staticClass:"e-course-list__more"},[i("span",{staticClass:"more-text pull-left",on:{click:function(t){return e.jumpTo(e.courseList.source)}}},[e._v("更多")])])])]),i("div",{staticClass:"e-course-list__body"},e._l(e.courseList.items,(function(t){return i("e-class",{key:t.id,attrs:{course:e._f("courseListData")(t,e.listObj),discount:"course_list"===e.typeList?t.courseSet.discount:"","course-type":"course_list"===e.typeList?t.courseSet.type:"","type-list":e.typeList,"normal-tag-show":e.normalTagShow,"vip-tag-show":e.vipTagShow,type:e.type,"is-vip":t.vipLevelId,feedback:e.feedback}})})),1),i("div",{directives:[{name:"show",rawName:"v-show",value:e.courseItemData,expression:"courseItemData"}],staticClass:"e-course__empty"},[e._v("暂无"+e._s("course_list"===e.typeList?"课程":"班级"))])]):e._e()}),[],!1,null,null,null);t.a=u.exports},"763b":function(e,t,i){"use strict";t.a=function(e,t){switch(t.type){case"price":var i=t.showStudent?'<span class="switch-box__state"><p style="color: #B0BDC9">\n            '.concat(e.studentNum,"人在学</p></span>"):"",s="0.00"===e.price?'<p style="color: #408FFB">免费</p>':'<p style="color: #ff5353">¥ '.concat(e.price,"</p>");return"classroom_list"===t.typeList?{id:e.id,targetId:e.targetId,imgSrc:{url:e.cover.middle||"",className:"e-class__img"},header:e.title,middle:{value:e.courseNum,html:'<div class="e-course__count">共 '.concat(e.courseNum," 门课程</div>")},bottom:{value:e.price||e.studentNum,html:'<span class="switch-box__price">'.concat(s,'</span>\n                  <span class="switch-box__state"><p style="color: #B0BDC9">\n                    ').concat(e.studentNum,"人在学</p>\n                  </span>")}}:{id:e.id,imgSrc:{url:e.courseSet.cover.middle||"",className:"e-course__img"},header:e.courseSetTitle,middle:{value:e.title,html:'<div class="e-course__project text-overflow">\n                  <span>'.concat(e.title,"</span>\n                </div>")},bottom:{value:e.price||e.studentNum,html:'<span class="switch-box__price">'.concat(s,"</span>").concat(i)}};case"confirmOrder":return{imgSrc:{url:e.cover.middle||"",className:"e-course__img"},header:e.title,middle:"",bottom:{value:e.coinPayAmount,html:'<span class="switch-box__price">\n                  <p style="color: #ff5353">¥ '.concat(e.coinPayAmount,"</p>\n                </span>")}};case"rank":return"classroom_list"===t.typeList?{id:e.id,targetId:e.targetId,imgSrc:{url:e.cover.middle||"",className:"e-class__img"},header:e.title,middle:"",bottom:{value:e.courseNum,html:'<div class="e-course__count">共 '.concat(e.courseNum," 门课程</div>")}}:{id:e.id,imgSrc:{url:e.courseSet.cover.middle||"",className:"course_list"===t.typeList?"e-course__img":"e-class__img"},header:e.courseSetTitle,middle:{value:e.title,html:'<div class="e-course__project text-overflow">\n                  <span>'.concat(e.title,"</span>\n                </div>")},bottom:{value:e.progress.percent,html:'<div class="rank-box">\n                  <div class="progress round-conner">\n                    <div class="curRate round-conner"\n                      style="width:'.concat(e.progress.percent,'%">\n                    </div>\n                  </div>\n                  <span>').concat(e.progress.percent,"%</span>\n                </div>")}};default:return"empty data"}}},"8bdb":function(e,t,i){"use strict";i("8e6e"),i("a481"),i("ac6a"),i("456d"),i("c5f6");var s=i("bd86"),r=(i("7f7f"),i("2f62"));function n(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}var a={props:{course:{type:Object,default:function(){return{}}},type:{type:String,default:"price"},courseType:{type:String,default:"normal"},discount:{type:String,default:"10"},feedback:{type:Boolean,default:!0},typeList:{type:String,default:"course_list"},normalTagShow:{type:Boolean,default:!0},vipTagShow:{type:Boolean,default:!1},isVip:{type:String,default:"0"}},data:function(){return{pathName:this.$route.name}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(i,!0).forEach((function(t){Object(s.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(i).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},Object(r.d)(["vipSwitch","isLoading"]),{discountNum:function(){if("class_list"===this.typeList)return!1;if(""!==this.discount){var e=Number(this.discount);return 10!==e&&(0==e?"限免":e+"折")}}}),watch:{course:{handler:function(e){var t=e.courseSet;if("h5Setting"!==this.pathName&&t)for(var i=Object.keys(t.cover),s=0;s<i.length;s++)t.cover[i[s]]=t.cover[i[s]].replace(/^(\/\/)|(http:\/\/)/,"https://")},immediate:!0}},methods:{onClick:function(e){if(this.feedback){var t="order"===this.type,i=this.course.id||this.course.targetId;"SPAN"!==e.target.tagName&&(t?location.href=this.order.targetUrl:this.$router.push({path:"course_list"===this.typeList?"/course/".concat(i):"/classroom/".concat(i)}))}}}},o=i("2877"),c=Object(o.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"e-course"},[i("div",{staticClass:"clearfix",on:{click:e.onClick}},[i("div",{staticClass:"e-course__left pull-left"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.course.imgSrc.url,expression:"course.imgSrc.url"}],class:e.course.imgSrc.className}),e.normalTagShow?i("div",["live"===e.courseType?i("span",{staticClass:"tag tag-live"},[e._v("直播")]):e._e(),e.discountNum?i("span",{staticClass:"tag tag-discount"},[e._v(e._s(e.discountNum))]):e._e()]):e._e(),e.vipTagShow&&e.vipSwitch&&Number(e.isVip)?i("span",{staticClass:"tag tag-vip"},[e._v("会员免费")]):e._e()]),i("div",{staticClass:"e-course__right pull-left"},[i("div",{staticClass:"e-course__header text-overflow"},[e._v(e._s(e.course.header))]),i("div",{staticClass:"e-course__middle"},[e.course.middle.value?i("div",{domProps:{innerHTML:e._s(e.course.middle.html)}}):e._e()]),i("div",{staticClass:"e-course__bottom",domProps:{innerHTML:e._s(e.course.bottom.html)}})])])])}),[],!1,null,null,null);t.a=c.exports},a9a0:function(e,t,i){"use strict";i.r(t),i("8e6e"),i("456d"),i("e7e5");var s=i("d399"),r=(i("7514"),i("75fc")),n=(i("c5f6"),i("ac6a"),i("8615"),i("bd86")),a=i("b9ff"),o=i("3ce7"),c=i("7212"),l=(i("dfa4"),{components:{swiper:c.swiper,swiperSlide:c.swiperSlide},props:{levels:{type:Array,default:function(){return[]}},isVip:{type:Object,default:function(){return{}}},buyType:{type:String,default:"month"},user:{type:Object,default:function(){return{}}},activeIndex:""},data:function(){var e=this;return{swiperOption:{notNextTick:!0,loop:!1,centeredSlides:!0,spaceBetween:38,slidesPerView:1.5,observer:!0,observeParents:!0,on:{slideChangeTransitionStart:function(){e.$emit("update:activeIndex",this.activeIndex)}}}}},computed:{swiper:function(){return this.$refs.mySwiper.swiper}},watch:{activeIndex:function(e){this.swiper.slideTo(e,1e3,!1)}},methods:{vipPopShow:function(){this.$emit("vipOpen",!0)},setActiveIndex:function(e){this.$emit("update:activeIndex",e)}}}),u=i("2877"),p=Object(u.a)(l,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vip-introduce gray-border-bottom"},[i("swiper",{ref:"mySwiper",attrs:{options:e.swiperOption}},e._l(e.levels,(function(t,s){return i("swiper-slide",{key:s},[i("img",{staticClass:"card-bg-img",attrs:{src:t.background}}),i("div",{staticClass:"vip-info"},[i("div",{staticClass:"vip-info__name text-overflow"},[e._v(e._s(t.name))]),i("div",{staticClass:"text-10 vip-rights-num"},[e._v(e._s(t.freeCourseNum)+"门课程 "+e._s(t.freeClassroomNum)+"个班级")]),i("div",{staticClass:"text-10"},[e._v("\n          "+e._s("year"===e.buyType?t.yearPrice+"元 / 年":t.monthPrice+"元 / 月")+"\n        ")])])])})),1),e.levels&&e.levels[e.activeIndex]?i("div",{directives:[{name:"show",rawName:"v-show",value:e.levels[e.activeIndex].description,expression:"levels[activeIndex].description"}],staticClass:"vip-introduce__text"},[i("header",{staticClass:"title-18 text-center ph20"},[e._v(e._s(e.levels[e.activeIndex].name)+"介绍")]),i("div",{staticClass:"text-content mt20"},[e._v(e._s(e.levels[e.activeIndex].description||"暂无介绍"))])]):e._e(),e.isVip&&e.user?e._e():i("div",{staticClass:"text-center"},[i("div",{staticClass:"btn-join-vip",on:{click:e.vipPopShow}},[e._v("开通会员")])])],1)}),[],!1,null,null,null).exports,d={name:"VipPopup",props:{item:{type:Object,default:function(){return{}}},index:{type:Number,default:-1},vipBuyType:{type:String,default:"month"}},created:function(){var e="year"===this.vipBuyType;(!e&&2===this.index||e&&0===this.index)&&this.handleClick()},methods:{handleClick:function(){this.$emit("selectItem",{num:this.item.num,unit:this.item.unit})}}},v=Object(u.a)(d,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"vip-price-item",on:{click:this.handleClick}},[t("div",{staticClass:"vip-price-item__buy-type mb15 text-14"},[this._v(this._s(this.item.time))]),t("div",{staticClass:"red"},[this._v("¥ "+this._s(this.item.price))]),t("i",{staticClass:"select-icon h5-icon h5-icon-zhengque"})])}),[],!1,null,null,null).exports,h=i("062f"),m={month:"个月",year:"年"},f=function(e,t,i){return{time:"".concat(e).concat(m[t]),price:(e*i).toFixed(2),num:e,unit:t}},y=function(e,t,i){switch(e){case"month":return[f(1,"month",t),f(3,"month",t),f(12,"month",t)];case"year":return[f(1,"year",i),f(2,"year",i),f(3,"year",i)];case"year_and_month":return[f(1,"month",t),f(3,"month",t),f(1,"year",i)];default:return""}},_=i("0d25"),g=i("2f62"),b=i("faa5"),w=i("4328"),S=i.n(w);function I(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,s)}return i}var C={components:{EPopup:a.a,priceItem:v,"vip-introduce":p,"e-course-list":h.a},data:function(){return{user:{},vipInfo:null,vipUser:{},levels:[{courses:{data:[]},classrooms:{data:[]}}],currentLevelIndex:0,activePriceIndex:-1,vipPopShow:!1,priceItems:[],buyType:"month",bottomBtnShow:!1,orderParams:{unit:"month",num:0},isShowInviteUrl:!1,drpSetting:{},bindAgencyRelation:{}}},computed:function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?I(i,!0).forEach((function(t){Object(n.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):I(i).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},Object(g.d)(["vipSettings","isLoading","vipSwitch"]),{},Object(g.d)({userInfo:function(e){return e.user}}),{vipDated:function(){if(!this.vipInfo)return!1;var e=new Date(this.vipInfo.deadline).getTime();return(new Date).getTime()>e},courseData:function(){var e=this.levels[this.currentLevelIndex].courses.data;if(0==e.length)return!1;var t={items:[],title:"会员课程",source:{},limit:4};return t.items=e,t},classroomData:function(){var e=this.levels[this.currentLevelIndex].classrooms.data;if(0==e.length)return!1;var t={items:[],title:"会员班级",source:{},limit:4};return t.items=e,t},vipDeadline:function(){if(!Object.values(this.vipInfo).length)return"";var e=new Date(this.vipInfo.deadline);return Object(_.formatFullTime)(e)},btnStatus:function(){if(!this.vipInfo)return"开通";var e=Number(this.levels[this.currentLevelIndex].seq),t=this.vipInfo.seq;return t>e?"":this.vipDated?"开通":t<e?"升级":"续费"},leftDays:function(){if(!Object.values(this.vipInfo).length)return!1;var e=(new Date).getTime(),t=new Date(this.vipInfo.deadline).getTime();return Object(_.getOffsetDays)(e,t)+1},inviteUrl:function(){var e={type:"vip",id:this.levels[this.currentLevelIndex].id,merchant_id:this.drpSetting.merchantId};return this.drpSetting.distributor_template_url+"?"+S.a.stringify(e)}}),created:function(){var e=this;this.vipSwitch?(o.a.getVipLevels({disableLoading:!1}).then((function(t){if(t.length){var i=e.$route.query.id,s=t[0].id;o.a.getVipDetail({query:{levelId:s}}).then((function(t){e.vipUser=t.vipUser||{},e.levels=t.levels,e.user=e.vipUser.user,e.vipInfo=e.vipUser.vip,e.buyType=e.vipSettings.buyType;var n=e.userInfo;n.vip=e.vipInfo,e.$store.commit(b.r,n),s=e.vipUser.vip?e.vipUser.vip.levelId:t.levels[0].id,s=isNaN(i)?s:i;for(var a=0;a<e.levels.length;a++){var o=t.levels[a];e.priceItems=[].concat(Object(r.a)(e.priceItems),[y(e.vipSettings.buyType,o.monthPrice,o.yearPrice)])}var c=0;t.levels.find((function(e,t){if(e.id===s)return c=t,e})),e.currentLevelIndex=c}))}else e.$router.push({name:"find"})})).catch((function(e){s.a.fail(e.message)})),this.showInviteUrl(),this.getDrpSetting(),setTimeout((function(){window.scrollTo(0,0)}),100)):this.$router.push({name:"find"})},mounted:function(){window.addEventListener("scroll",this.handleScroll,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleScroll,!0)},methods:{selectPriceItem:function(e,t){this.activePriceIndex=t,this.orderParams.unit=e.unit,this.orderParams.num=e.num},joinVip:function(){this.activePriceIndex<0||this.$router.push({name:"order",params:{id:this.levels[this.currentLevelIndex].id,unit:this.orderParams.unit,num:this.orderParams.num,type:this.btnStatus},query:{targetType:"vip"}})},vipOpen:function(){this.user?this.vipPopShow=!0:this.$router.push({path:"/login",query:{redirect:"/vip"}})},handleScroll:function(){if(this.btnStatus){var e="",t=0;this.user&&this.vipUser.vip?e=this.$refs.joinBtnTop.getBoundingClientRect().bottom:(e=this.$refs.joinBtnBottom.$el.getBoundingClientRect().bottom,t=45),this.bottomBtnShow=e<t}},popShow:function(){var e=this;if(this.user){if("升级"===this.btnStatus){var t=this.vipSettings.upgradeMinDay;return this.leftDays<=t?void Object(s.a)("会员剩余天数小于".concat(t,"天，请先续费后再升级")):(this.activePriceIndex=0,void this.joinVip())}if(this.vipDated&&this.vipInfo){var i=0;this.levels.find((function(t,s){if(t.id===e.vipInfo.levelId)return i=s,t})),this.currentLevelIndex=i}this.vipPopShow=!0}else this.$router.push({path:"/login",query:{redirect:"/vip"}})},showInviteUrl:function(){var e=this;o.a.hasDrpPluginInstalled().then((function(t){t.Drp?o.a.getAgencyBindRelation().then((function(t){t.agencyId?(e.bindAgencyRelation=t,e.isShowInviteUrl=!0):e.isShowInviteUrl=!1})):e.isShowInviteUrl=!1}))},getDrpSetting:function(){var e=this;o.a.getDrpSetting().then((function(t){e.drpSetting=t}))}}},x=Object(u.a)(C,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vip-detail"},[e.isLoading?i("e-loading"):e._e(),i("div",{staticClass:"user-section gray-border-bottom clearfix"},[e.user?i("div",[e.user.avatar?i("img",{staticClass:"user-img",attrs:{src:e.user.avatar.large}}):e._e(),i("div",{staticClass:"user-middle"},[i("div",{staticClass:"user-name"},[e._v(e._s(e.user.nickname))]),e.vipInfo?i("span",{staticClass:"user-vip"},[e.vipInfo.icon?i("img",{class:["vip-img",e.vipDated?"vip-expired":""],attrs:{src:e.vipInfo.icon}}):e._e(),e.vipDated?i("span",{staticClass:"grey vip-name vip-name-short text-overflow"},[e._v(e._s(e.vipInfo.vipName)+"已过期")]):i("span",[e._v(e._s(e.vipInfo.vipName))])]):i("span",{staticClass:"user-vip"},[e._v("\n          您还不是会员\n        ")])]),e.vipInfo?i("div",{staticClass:"vip-status"},[e.btnStatus?i("div",{ref:"joinBtnTop",staticClass:"vip-status__btn",on:{click:e.popShow}},[e._v(e._s(e.vipDated?"重新开通":e.btnStatus))]):e._e(),e.vipDeadline?i("div",{class:["vip-status__deadline",e.btnStatus?"":"deadline-middle"]},[e._v(e._s(e.vipDeadline)+" 到期")]):e._e()]):e._e()]):i("router-link",{attrs:{to:{path:"/login",query:{redirect:"/vip"}}}},[i("img",{staticClass:"user-img",attrs:{src:"static/images/avatar.png"}}),i("div",{staticClass:"user-middle single-middle"},[i("div",{class:["user-vip",e.user?"":"text-middle"]},[e._v("\n          立即登录，查看会员权益\n        ")])])])],1),i("vip-introduce",{ref:"joinBtnBottom",attrs:{levels:e.levels,user:e.user,"buy-type":e.buyType,"is-vip":e.vipUser.vip,"active-index":e.currentLevelIndex},on:{"update:activeIndex":function(t){e.currentLevelIndex=t},"update:active-index":function(t){e.currentLevelIndex=t},vipOpen:e.vipOpen}}),e.isShowInviteUrl?i("a",{attrs:{href:e.inviteUrl}},[i("div",{staticClass:"coupon-code-entrance"},[e._v("邀请好友购买\n      "),i("i",{staticClass:"van-icon van-icon-arrow pull-right"}),i("i",{staticClass:"pull-right"},[e._v("赚 "+e._s(e.drpSetting.minDirectRewardRatio)+"%")])])]):e._e(),e.courseData?i("e-course-list",{staticClass:"gray-border-bottom",attrs:{"course-list":e.courseData,"vip-name":e.levels[e.currentLevelIndex].name,"more-type":"vip","level-id":Number(e.levels[e.currentLevelIndex].id),"type-list":"course_list"}}):e._e(),e.classroomData?i("e-course-list",{staticClass:"gray-border-bottom",attrs:{"more-type":"vip","level-id":Number(e.levels[e.currentLevelIndex].id),"course-list":e.classroomData,"vip-name":e.levels[e.currentLevelIndex].name,"type-list":"classroom_list"}}):e._e(),e.priceItems[e.currentLevelIndex]?i("e-popup",{staticClass:"vip-popup",attrs:{show:e.vipPopShow,title:e.btnStatus+e.levels[e.currentLevelIndex].name,"content-class":"vip-popup__content"},on:{"update:show":function(t){e.vipPopShow=t}}},[i("div",{staticClass:"vip-popup__header text-14"},[e._v("选择"+e._s(e.btnStatus)+"时长")]),i("div",{staticClass:"vip-popup__body"},[i("van-row",{attrs:{gutter:"20"}},e._l(e.priceItems[e.currentLevelIndex],(function(t,s){return i("van-col",{key:s,attrs:{span:"8"}},[i("price-item",{class:{active:s===e.activePriceIndex},attrs:{item:t,index:s,"vip-buy-type":e.vipSettings.buyType},on:{selectItem:function(t){return e.selectPriceItem(t,s)}}})],1)})),1)],1),i("div",{staticClass:"btn-join-bottom",class:{disabled:e.activePriceIndex<0},on:{click:e.joinVip}},[e._v("确认"+e._s(e.btnStatus))])]):e._e(),e.bottomBtnShow&&e.btnStatus&&!e.vipDated?i("div",{staticClass:"btn-join-bottom",on:{click:e.popShow}},[e._v("立即"+e._s(e.btnStatus))]):e._e()],1)}),[],!1,null,null,null);t.default=x.exports},b9ff:function(e,t,i){"use strict";var s={name:"EPopup",props:{show:{type:Boolean,default:!1},title:{type:String,default:""},contentClass:{type:String,default:""}},computed:{popupShow:{get:function(){return this.show},set:function(e){this.$emit("update:show",e)}}},methods:{toggleClick:function(){this.popupShow=!1}}},r=i("2877"),n=Object(r.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("van-popup",{staticClass:"e-popup",attrs:{position:"bottom"},model:{value:e.popupShow,callback:function(t){e.popupShow=t},expression:"popupShow"}},[i("div",{staticClass:"e-popup__title"},[i("span",{staticClass:"name"},[e._v(e._s(e.title))]),i("i",{staticClass:"icon h5-icon h5-icon-guanbi",on:{click:e.toggleClick}})]),i("div",{staticClass:"e-popup__content",class:e.contentClass},[e._t("default")],2)])}),[],!1,null,null,null);t.a=n.exports}}]);