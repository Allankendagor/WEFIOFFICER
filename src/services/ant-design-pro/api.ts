// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('awesomeleadstoken');

  // Check if the token is available
  if (!token) {
    throw new Error('No token found');
  }
   // Make the API request to get the current user info
   const response = await fetch('http://52.206.183.121:8000/admin/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    },
    ...(options || {}),
  });

  // Check if the response is successful
  if (!response.ok) {
    throw new Error('Failed to fetch user information');
  }

  // Parse the response as JSON
  const data = await response.json();

  // Return the user data
  return {
    data: data as API.CurrentUser,
  };
}


/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  // Perform the logout request to the API
  const response = await fetch('http://52.206.183.121:8000/admin/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('awesomeleadstoken')}`,
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });

  // If the response is successful, clear the token from local storage
  if (response.ok) {
    localStorage.removeItem('awesomeleadstoken');
  }

  // Return the response data
  return response.json();
}
/** 登录接口 POST /api/login/account */
export async function login(params: API.LoginParams) {
  return fetch("http://52.206.183.121:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(`grant_type=&username=${params.username}&password=${params.password}&scope=&client_id=&client_secret=`),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Login error:", error);
      throw error;
    });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}
