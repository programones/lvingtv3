import axios from 'axios'
export const http = axios.create({
    baseURL: 'https://bi.psvideo.cn/' ,//数据请求基地址,
    timeout: 10000,
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  // export const https = axios.create({
  //   baseURL: 'http://bi.psvideo.cn/' ,//数据请求基地址,
  //   // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   headers: { 'content-type': 'multipart/form-data' }
  // })
   //room 微信分享设置
 http.weixinshare=({room_id,mid,page_url})=>{
  return http.post(`/wx/share/${mid}`,{
    room_id,page_url
  })
}
   //room 获取mid请求
   http.getmid=(room_id)=>{
    return http.get('api/get_mid',{
      params:{
        room_id
      }
      
    })
   }

   //room 获取微信授权的url
   http.getCodeUrl=({page_url,mid})=>{
      return http.get('/wx/oauth/'+mid,{
        params:{
          page_url 
        }
      })
   }
 //room 第三方登陆获取临时(非手机号码)授权
  http.getLoginOther=({auth_id,type})=>{
    return http.post('/api/login_auth',{
      auth_id,type   
    })
  }
  //room 分享的请求
  http.shareRec=({openid,uid,ip,room_id})=>{
    return http.post('/api/user_share_log',{
      openid,uid,ip,room_id
    })
  }
  //questionForm 获取问题列表
  http.getQuestionList=(room_id)=>{
    return http.post('/api/question',{
      room_id
    })
  }

http.headList = () => { 
   //获取头部导航标签
    return http.get('api/liveroom/get_category/',{params: { 
      }})
  }
http.livingTvList= () =>{
  //获取直播间直播房间列表
  return http.get('api/liveroom/list',{})
}
//  room 中获取微信用户信息
http.getweichatIfo=(code)=>{
 return http.get('/api/wx_oauth',{
   params:{
    code
   }
 })
}
// room 中传入mid 单独获取授权
http.weichatRoomID=({mid,code})=>{
 return http.get(`/wx/oauth_callback/${mid}`,{
   params:{
    code
   }
 })
}

 http.getgoodsDetile=(goods_id)=>{
  //prodeuctDetile获取详细商品列表信息
   return http.post('/api/goods_detail',{
    goods_id
   })
 }
 http.getgoodsExchange=({goods_id,member_token,num})=>{
  //prodeuctDetile 兑换或购买商品列表信息
   return http.post('/api/goods_exchange',{
    goods_id,member_token,num
   })
 }

http.getcommodityList=(page)=>{
  // moreCommodity 获取更多商品列表
  return http.post('/api/goods_list',{
      page
  })
}
 
 //rearch 获取搜索结果相关
  http.getSearchResult=({keyword,cate_id})=>{
    return http.get('/api/liveroom/list',{
      params:{
        keyword,cate_id
      }
    })
  }
http.livingRoom=({room_id,member_token,ip,iploc,history,lesson})=>{
  //videoArea获取直播间的详细信息
  return http.post('/api/room',{
    room_id,member_token,ip,iploc,history,lesson
  })
}
//videoArea观看领取积分
http.getpoint=({room_id,room_title,member_token})=>{
  return http.post('/api/watch_video_points',{
    room_id,room_title,member_token
  })
}
 //videoArea贴片广告
 http.getTeaserAD=({room_id,current_time,member_token,ip,iploc})=>{
      return http.post('/api/get_video_ads',{
        room_id,current_time,member_token,ip,iploc  
      })
 }
 //videoArea 输入密码观看直播
 http.checkedVideo=({password,room_id})=>{
      return http.post('/api/verify_password',{
        password,room_id  
      })
 }
 //videoTabsBrand 获取广告列表
   http.getADList=({ip,iploc,member_token,room_id,uid})=>{
     return http.post('/api/ads',{
      ip,iploc,member_token,room_id,uid
     })
   }
   //videoTabsBrand 点击广告的统计
   http.clickADreq=({member_token,ip,iploc,room_id,ads_id})=>{
    return http.post('/api/click_ads',{
      member_token,ip,iploc,room_id,ads_id
    })
   }
   
   // videoTabsRanklist 获取邀请粉丝排行列表
   http.getRankList=(room_id)=>{
    return http.post('/api/invite_rank_list',{
      room_id
    })

   }

   
 //videoTabs tab栏切换
 http.roomtabs = (room_id)=>{
   return http.post('/api/get_room_column',{
    room_id
   })
 }
 //videoTabsChat 获取历史聊天记录
  http.getchatHistory=({room_id,member_token,page})=>{
    return http.post('/api/get_msg_history',{
      room_id,member_token,page  
    })
  }
  //videoTabsChat 保存历史聊天记录
  http.savechatHistory =({member_token,m_account,m_uid,m_nick,m_img,m_groupid,m_seq,m_time,m_ip,m_text,m_subtype,m_type,m_ext})=>{
    return http.post('/api/save_msg_history', {
      member_token,m_account,m_uid,m_nick,m_img,m_groupid,m_seq,m_time,m_ip,m_text,m_subtype,m_type,m_ext
    })
  }
  //videoTabsChat 获取直播间的房间信息?
  http.getroomIfo=({member_token,ip,room_id})=>{
    return http.post('/api/live_avc_user',{
      member_token,ip,room_id
    })
  }
  //videoTabsMe 判断token是否有效
  http.userIfourl=(member_token)=>{
    return http.post('/api/user',{
      member_token
    })
  }
  //videoTabsChat 发送聊天信息请求之二
  http.sendchatmsg=({member_token,message})=>{
    return http.post('/api/check_user_msg',{
      member_token,message
    })
  }
   //videoTabsChat 获取礼物列表
   http.getGift=(rid)=>{
    return http.post('/api/get_gift',{rid})
   }
   //videoTabsChat 获取点击领取红包
   http.drawRedPaper=({member_token,rp_id,room_id})=>{
    return http.post('/api/get_redpacket',{
      member_token,rp_id,room_id
    })
   }
   //videoTabsChat 获取点击的红包统计链接
    http.clickRedpaper=({ads_id,ip,iploc,member_token})=>{
      return http.post('/api/get_ads_rp',{
        ads_id,ip,iploc,member_token  
      })
    }
  //videoTabsRecord 获取历史视频记录
   http.getvideoHistory=(room_id)=>{
        return http.post('/api/live_history',{
        room_id  
        })
   }
   //videoTabsPaytheme 获取付费主题
   http.getpaytheme= (room_id)=>{
    return http.post('/api/live_lesson',{
      room_id
    })
   }
  
   //registered 发送验证码
   http.sendcode=(mobile)=>{
     return http.post('/api/send_code',{
      mobile
     })
   }
   //registered 获取登陆后的token
   http.getloginToken=({mobile,mobile_code,openid,nickname,sex,province,city,country,headimgurl,uid,room_id})=>{
     return http.post('/api/login',{
      mobile,mobile_code,openid,nickname,sex,province,city,country,headimgurl,uid,room_id
     })
   }
   //maogaoDetile 获取课程的封面,标题信息等
   http.getlessonIfo=(vod_id)=>{
     return  http.post('/api/lesson',{
      vod_id
     })
   }
   //maogaoDetile payMask发起视频结算相关信息
    http.getlessonPay=({room_id,member_token,pay_way,pay_type,vod_id})=>{
      return http.post('/api/video_pay',{
        room_id,member_token,pay_way,pay_type,vod_id
      })
    }
   //videoTabsChat 礼物结算信息
    http.getGiftPay=({room_id,member_token,pay_way,pay_type,gift_id})=>{
      return http.post('/api/video_pay',{
        room_id,member_token,pay_way,pay_type,gift_id
      })
    }
    //unreadIfo 获取积分的信息
    http.getunreadIfoList=({member_token,page})=>{
      return http.post('/api/user_message',{
        member_token,page
      })
    }
    //personalIntrgral 获取个人积分详细信息
    http.getIntrgralList=({endtime,member_token,page,starttime})=>{
      return http.post('/api/point_list',{
        endtime,member_token,page,starttime
      })
    }
    //prizeTask 获取有奖任务相关信息
    http.getPrizeIfo=(member_token)=>{
      return http.post('/api/task_list',{
        member_token
      })
    }
    //orderDetile 获取购物订单列表
    http.getorderDetileList=({member_token,page})=>{
      return http.post('/api/order_list',{
        member_token,page
      })
    }
    //balance 获取红包列表
    http.getBalanceList=({member_token,page})=>{
      return http.post('/api/redpacket',{
        member_token,page
      })
    }
    //balance 提现请求
    http.getMoney=(member_token)=>{
      return http.get('/api/ext_redpacket',{
        params:{
          member_token
        }
       
      })
    }
    // ad 获取商品列表的请求方法
    http.getadList=()=>{
      return http.post('/api/goods_hot',{})
    }
    //login 根据token获取用户用户的详细信息
    http.getUserIfo=(member_token)=>{
      return http.post('/api/user',{member_token})
    }
    //consumeMoney 获取历史消费记录
    http.getconMoneyList=({member_token,type,starttime,endtime,page})=>{
      return http.post('/api/user_account_list',{
        member_token,type,starttime,endtime,page
      })
    }
    //bankCard 银行卡绑定请求
    http.bankCardBind=({member_token,bank,bank_user,bank_account,bank_branch})=>{
      return http.post('/api/bank_add',{
        member_token,bank,bank_user,bank_account,bank_branch  
      })
    }
    //bankcard 获取银行卡列表
    http.bankCardList = (member_token)=>{
      return http.post('/api/bank_list',{
        member_token
      })
    }
    //myadress 添加地址的链接
    http.addAddress=({member_token,true_name,address,area_id,city_id,province_id,mob_phone,is_default})=>{
      return http.post('/api/add_address',{
        member_token,true_name,address,area_id,city_id,province_id,mob_phone,is_default 
      })
    }
    // myadress 获取自己的收获地址列表
    http.addressList=(member_token)=>{
      return http.post('/api/address_list',{
        member_token  
      })
    }
    //myadress 修改编辑地址
    http.editAddress=({member_token,true_name,address,area_id,city_id,province_id,mob_phone,is_default})=>{
      return http.post('/api/edit_address',{
        member_token,true_name,address,area_id,city_id,province_id,mob_phone,is_default  
      })
    }
    