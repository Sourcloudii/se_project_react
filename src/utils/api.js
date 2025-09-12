const BASE_URL = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

export function deleteClothingItem(itemId, token) {
  return fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function postNewClothingItem({ name, imageUrl, weather }, token) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
}

export function likeItem(itemId, token) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function dislikeItem(itemId, token) {
  return fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
