import { createSlice } from "@reduxjs/toolkit";

const currentUser = {
  email: "krishan.mondal@gmail.com",
};

let postId = 7;

const POSTS_DATA = [
  {
    email: "krishan.mondal@gmail.com",
    postId: 1,
    content:
      "Exploring the beauty of web development! Recently built a dynamic website with React and Node.js. Loving the process and the challenges that come with it.",
    image:
      "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    likes: 7,
  },
  {
    email: "john.doe@example.com",
    postId: 2,
    content:
      "Just finished a fantastic book on JavaScript patterns. Highly recommend 'JavaScript: The Good Parts' to anyone looking to deepen their understanding of the language.",
    image:
      "https://plus.unsplash.com/premium_photo-1690303193655-db7040673780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlYnNpdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    likes: 45,
  },
  {
    email: "jane.smith@example.com",
    postId: 3,
    content:
      "Had an amazing time at the design workshop this weekend. Learned so much about UI/UX principles and met some incredible designers. Can't wait to apply these new skills to my projects!",
    image:
      "https://plus.unsplash.com/premium_photo-1661713210744-f5be3c3491fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
    likes: 102,
  },
  {
    email: "alice.jones@example.com",
    postId: 4,
    content:
      "Excited to announce that I will be speaking at the upcoming AI conference in San Francisco! I'll be discussing the latest trends in machine learning and data science.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWklMjBjb25mZXJlbmNlfGVufDB8fDB8fHww",
    likes: 78,
  },
  {
    email: "michael.brown@example.com",
    postId: 5,
    content:
      "Startup life is intense but rewarding. Just secured our first round of funding, and we're ready to take our product to the next level. Stay tuned for updates!",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 156,
  },
  {
    email: "emma.white@example.com",
    postId: 6,
    content:
      "Traveling through the Swiss Alps has been a dream come true. The landscapes are breathtaking, and I’ve captured some stunning photos. Check out my blog for the full adventure!",
    image:
      "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 230,
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState: POSTS_DATA,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        email: currentUser.email,
        postId: postId++,
        content: action.payload.content,
        image: action.payload.imgUrl,
        likes: 0,
      };

      state.unshift(newPost);
    },
    updateLike: (state, action) => {
      const postIndex = state.findIndex(
        (post) => post.postId === action.payload
      );

      state[postIndex].likes++;
    },
    removeLike: (state, action) => {
      const postIndex = state.findIndex(
        (post) => post.postId === action.payload
      );

      state[postIndex].likes--;
    },
  },
});

export const postsActions = postSlice.actions;
export default postSlice;
