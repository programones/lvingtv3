import axios from 'axios'
export const http = axios.create({
    baseURL: 'http://bi.psvideo.cn/' //数据请求基地址
  })
 
http.headList = () => { 
   //获取头部导航标签
    return http.get('api/liveroom/get_category/',{params: { 
      }})
  }
http.livingTvList= () =>{
  //获取直播间直播房间列表
  return http.get('api/liveroom/list',{})
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
  //videoTabsChat 发送聊天信息请求之一
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
   http.getGift=()=>{
    return http.post('/api/get_gift',{})
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
   //获取登陆后的token
   http.getloginToken=({mobile,mobile_code,openid,nickname,sex,province,city,country,headimgurl,uid,room_id})=>{
     return http.post('/api/login',{
      mobile,mobile_code,openid,nickname,sex,province,city,country,headimgurl,uid,room_id
     })
   }

