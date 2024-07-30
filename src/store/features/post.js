import { createSlice } from "@reduxjs/toolkit";

let postId = 7;

const POSTS_DATA = [
  {
    email: "john.doe@example.com",
    postId: 2,
    date: "2024-07-05T14:23:35.000Z",
    content:
      "Just finished a fantastic book on JavaScript patterns. Highly recommend 'JavaScript: The Good Parts' to anyone looking to deepen their understanding of the language.",
    image:
      "https://plus.unsplash.com/premium_photo-1690303193655-db7040673780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    likes: { count: 45, likedBy: [] },
    comments: [
      {
        id: 1,
        email: "jane.smith@example.com",
        text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. At qui temporibus odit, unde fugit sit in. Ad obcaecati quaerat alias.",
        createdAt: "2024-07-05T14:23:35.000Z",
      },
    ],
  },
  {
    email: "jane.smith@example.com",
    postId: 3,
    date: "2024-07-12T08:45:12.000Z",
    content:
      "Had an amazing time at the design workshop this weekend. Learned so much about UI/UX principles and met some incredible designers. Can't wait to apply these new skills to my projects!",
    image:
      "https://plus.unsplash.com/premium_photo-1661713210744-f5be3c3491fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    likes: { count: 102, likedBy: [] },
    comments: [],
  },
  {
    email: "alice.jones@example.com",
    postId: 4,
    date: "2024-07-15T19:54:28.000Z",
    content:
      "Excited to announce that I will be speaking at the upcoming AI conference in San Francisco! I'll be discussing the latest trends in machine learning and data science.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBjb25mZXJlbmNlfGVufDB8fDB8fHww",
    likes: { count: 78, likedBy: [] },
    comments: [],
  },
  {
    email: "michael.brown@example.com",
    postId: 5,
    date: "2024-07-10T11:16:45.000Z",
    content:
      "Startup life is intense but rewarding. Just secured our first round of funding, and we're ready to take our product to the next level. Stay tuned for updates!",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: { count: 156, likedBy: [] },
    comments: [],
  },
  {
    email: "emma.white@example.com",
    postId: 6,
    date: "2024-07-08T09:32:10.000Z",
    content:
      "Traveling through the Swiss Alps has been a dream come true. The landscapes are breathtaking, and I’ve captured some stunning photos. Check out my blog for the full adventure!",
    image:
      "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: { count: 230, likedBy: [] },
    comments: [],
  },
  {
    email: "krishan.mondal@gmail.com",
    postId: 1,
    date: "2024-07-21T08:22:54.783Z",
    content:
      "Exploring the beauty of web development! Recently built a dynamic website with React and Node.js. Loving the process and the challenges that come with it.",
    image:
      "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    likes: { count: 7, likedBy: ["john.doe@example.com"] },
    comments: [],
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState: POSTS_DATA,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        email: action.payload.email,
        postId: postId++,
        date: action.payload.date,
        content: action.payload.content,
        image: action.payload.imgUrl,
        likes: { count: 0, likedBy: [] },
        comments: [],
      };

      state.unshift(newPost);
    },
    deletePost: (state, action) => {
      const index = state.findIndex((post) => post.postId === action.payload);

      state.splice(index, 1);
    },
    updateLike: (state, action) => {
      const { postId, userEmail } = action.payload;
      const postIndex = state.findIndex((post) => post.postId === postId);

      state[postIndex].likes.count++;
      state[postIndex].likes.likedBy.push(userEmail);
    },
    removeLike: (state, action) => {
      const { postId, userEmail } = action.payload;
      const postIndex = state.findIndex((post) => post.postId === postId);

      state[postIndex].likes.count--;
      state[postIndex].likes.likedBy = state[postIndex].likes.likedBy.filter(
        (user) => user !== userEmail
      );
    },
    addComment: (state, action) => {
      const { postId, data } = action.payload;
      const postIndex = state.findIndex((post) => post.postId === postId);

      state[postIndex].comments.unshift(data);
    },
  },
});

export const postsActions = postSlice.actions;
export default postSlice;
