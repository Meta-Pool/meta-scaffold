export interface Question {
  title: string;
  text: string;
}
export const FAQ = [
  {
    title: "What is Meta Scaffold?",
    text: "Meta Scaffold is the easiest way to get started with Meta dapps by providing a forkable dev stack focused on fast product iterations, with everything set up for you. ",
  },
  {
    title: "What is the Meta Scaffold stack?",
    text: `<ul style="margin-left: 20px">
        <li>Node Version: 16.x</li>
        <li>Npm Version: 7.x</li>
        <li>Language: TypeScript</li>
        <li>UI library: React.js</li>
        <li>UI Framework: Next.js (https://nextjs.org/)</li>
        <li>State management: Zustand (https://github.com/pmndrs/zustand) </li>   
        <li>API calls: React Query (https://tanstack.com/query/v4/docs/overview)
        </li>
        <li>Design System: Chakra UI / Chakra UI Pro with Emotion (https://chakra-ui.com / https://pro.chakra-ui.com/)
        </li>
        <li>Form management: Formik / Yup (https://formik.org/ / https://github.com/jquense/yup)
        </li>   
        <li>Deployment: Vercel (https://vercel.com/docs)
        </li>
    </ul>`,
  },
];
