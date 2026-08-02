/* ═══════════════════════════════════════════════════════════════════════
   ABRAR FAIYAZ — portfolio runtime
   Motion language: "Signal Flow" (docs/04). No dependencies, no build step.

   Structure:
     1. Content registry   — all copy/data lives here, components never do
     2. Utilities
     3. Boot
     4. Chrome (theme, nav, loader, cursor, progress)
     5. Motion (reveal, split text, magnetic, tilt, counters)
     6. Sections (rendered from the registry)
     7. Interactions (modal, lightbox, copy, toasts, achievements)
     8. Easter eggs
     9. Fun Mode — Fish Climb
   ═══════════════════════════════════════════════════════════════════════ */

/* ── 1. Content registry ────────────────────────────────────────────── */

const GH = 'https://github.com/Abrar-Faiyaz07/';

// The four values Abrar still has to fill in — see PROGRESS.md.
const LINKS = {
  github:     'https://github.com/Abrar-Faiyaz07',
  linkedin:   'https://www.linkedin.com/in/abrar-faiyaz-049056301',
  instagram:  'https://www.instagram.com/abrar_faiyaz_samin/',
  codeforces: 'https://codeforces.com/profile/Abrar_Faiyaz',
  leetcode:   'https://leetcode.com/u/Caraxes007/',
  email:      'abrarsamin04@gmail.com',
};

const TYPE_ROLES = [
  'software that ships.',
  'games from scratch.',
  'embedded systems.',
  'data-driven tools.',
  'AI-driven solutions.',
];

const CURRENT_STACK = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'React', 'Node.js', 'Git', 'SQL', 'PostgreSQL', 'MySQL'];

/* Brand marks for the stack ticker. Paths are Simple Icons (CC0), inlined so
   the page stays self-contained — no icon CDN, no extra requests. */
const TECH_LOGOS = {
  'C':           { color: '#A8B9CC', path: 'M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z' },
  'C++':         { color: '#00599C', path: 'M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z' },
  'Java':        { color: '#F89820', path: 'M11.915 0 11.7.215C9.515 2.4 7.47 6.39 6.046 10.483c-1.064 1.024-3.633 2.81-3.711 3.551-.093.87 1.746 2.611 1.55 3.235-.198.625-1.304 1.408-1.014 1.939.1.188.823.011 1.277-.491a13.389 13.389 0 0 0-.017 2.14c.076.906.27 1.668.643 2.232.372.563.956.911 1.667.911.397 0 .727-.114 1.024-.264.298-.149.571-.33.91-.5.68-.34 1.634-.666 3.53-.604 1.903.062 2.872.39 3.559.704.687.314 1.15.664 1.925.664.767 0 1.395-.336 1.807-.9.412-.563.631-1.33.72-2.24.06-.623.055-1.32 0-2.066.454.45 1.117.604 1.213.424.29-.53-.816-1.314-1.013-1.937-.198-.624 1.642-2.366 1.549-3.236-.08-.748-2.707-2.568-3.748-3.586C16.428 6.374 14.308 2.394 12.13.215zm.175 6.038a2.95 2.95 0 0 1 2.943 2.942 2.95 2.95 0 0 1-2.943 2.943A2.95 2.95 0 0 1 9.148 8.98a2.95 2.95 0 0 1 2.942-2.942zM8.685 7.983a3.515 3.515 0 0 0-.145.997c0 1.951 1.6 3.55 3.55 3.55 1.95 0 3.55-1.598 3.55-3.55 0-.329-.046-.648-.132-.951.334.095.64.208.915.336a42.699 42.699 0 0 1 2.042 5.829c.678 2.545 1.01 4.92.846 6.607-.082.844-.29 1.51-.606 1.94-.315.431-.713.651-1.315.651-.593 0-.932-.27-1.673-.61-.741-.338-1.825-.694-3.792-.758-1.974-.064-3.073.293-3.821.669-.375.188-.659.373-.911.5s-.466.2-.752.2c-.53 0-.876-.209-1.16-.64-.285-.43-.474-1.101-.545-1.948-.141-1.693.176-4.069.823-6.614a43.155 43.155 0 0 1 1.934-5.783c.348-.167.749-.31 1.192-.425zm-3.382 4.362a.216.216 0 0 1 .13.031c-.166.56-.323 1.116-.463 1.665a33.849 33.849 0 0 0-.547 2.555 3.9 3.9 0 0 0-.2-.39c-.58-1.012-.914-1.642-1.16-2.08.315-.24 1.679-1.755 2.24-1.781zm13.394.01c.562.027 1.926 1.543 2.24 1.783-.246.438-.58 1.068-1.16 2.08a4.428 4.428 0 0 0-.163.309 32.354 32.354 0 0 0-.562-2.49 40.579 40.579 0 0 0-.482-1.652.216.216 0 0 1 .127-.03z' },
  'Python':      { color: '#3776AB', path: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z' },
  'JavaScript':  { color: '#F7DF1E', path: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z' },
  'React':       { color: '#61DAFB', path: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z' },
  'Node.js':     { color: '#5FA04E', path: 'M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z' },
  'Git':         { color: '#F05032', path: 'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187' },
  'PostgreSQL':  { color: '#4169E1', path: 'M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z' },
  'MySQL':       { color: '#4479A1', path: 'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z' },
  'SQL':         { color: '#8A93A8', path: 'M12 0C7.03 0 3 1.79 3 4v16c0 2.21 4.03 4 9 4s9-1.79 9-4V4c0-2.21-4.03-4-9-4zm0 2c4.42 0 7 1.47 7 2s-2.58 2-7 2-7-1.47-7-2 2.58-2 7-2zm7 18c0 .53-2.58 2-7 2s-7-1.47-7-2v-2.7C6.6 18.36 9.13 19 12 19s5.4-.64 7-1.7V20zm0-5c0 .53-2.58 2-7 2s-7-1.47-7-2v-2.7C6.6 13.36 9.13 14 12 14s5.4-.64 7-1.7V15zm0-5c0 .53-2.58 2-7 2s-7-1.47-7-2V7.3C6.6 8.36 9.13 9 12 9s5.4-.64 7-1.7V10z' },
};

const EXPLORING = [
  'Artificial Intelligence & Machine Learning',
  'Generative AI & Prompt Engineering',
  'Embedded Systems & Robotics',
  'Competitive Programming',
  'Game Development',
  'System Design',
];

const EDUCATION = [
  {
    date: '2024 — present',
    title: 'BSc in Computer Science & Engineering',
    org: 'Islamic University of Technology · Gazipur, Bangladesh',
    meta: 'In progress · 2nd year',
    note: 'Core CSE curriculum with a self-directed focus on AI/ML and generative AI. Active in the Robotics Society R&D Panel and the Al Biruni Research Society alongside coursework.',
  },
  {
    date: '2021 — 2023',
    title: 'Higher Secondary Certificate (HSC)',
    org: 'Ibne Taimiya School and College · Cumilla, Bangladesh',
    meta: 'GPA 5.00 / 5.00',
    note: 'Science group. First sustained programming work, and the point the engineering path was decided.',
  },
  {
    date: '2016 — 2021',
    title: 'Secondary School Certificate (SSC)',
    org: 'Ibne Taimiya School and College · Cumilla, Bangladesh',
    meta: 'GPA 4.86 / 5.00',
    note: 'First exposure to C and to structured problem solving.',
  },
];

const EXPERIENCE = [
  {
    id: 'iut-rs',
    tab: 'IUT Robotics Society',
    role: 'General Executive Member',
    org: 'Research & Development Panel',
    date: '2025 — present',
    bullets: [
      'Sit on the R&D Panel, helping plan and run hands-on robotics and hardware sessions for fellow students.',
      'Built and debugged Arduino projects with the team, from wiring through to firmware.',
      'Completed the Basic Arduino & Robotics workshop run by the IEEE RAS IUT Student Branch Chapter.',
    ],
  },
  {
    id: 'al-biruni',
    tab: 'Al Biruni Research Society',
    role: 'General Executive Member',
    org: 'Al Biruni Research Society, IUT',
    date: '2025 — present',
    bullets: [
      'Part of the executive body of IUT\'s research-focused student society.',
      'Exposure to how academic research is scoped, reviewed and presented — groundwork for research assistantship work later in the degree.',
    ],
  },
  {
    id: 'code-rush',
    tab: 'Code Rush 2025',
    role: 'Active Volunteer',
    org: 'IUT Computer Society (IUTCS)',
    date: '2025',
    bullets: [
      'Volunteered across multiple IUTCS events with event coordination and participant handling.',
      'On-ground support during contest days: registration, logistics, and problem-desk runs.',
      'Handled production of posters, crests and other event materials.',
    ],
  },
  {
    id: 'iupc',
    tab: 'IUPC @ IUT',
    role: '26th position (team)',
    org: 'Inter University Programming Contest',
    date: '2025',
    bullets: [
      'Competed as part of a three-person team at the Inter University Programming Contest hosted at IUT.',
      'Finished 26th overall, competing under contest time constraints against teams from other universities.',
    ],
  },
];

const PROJECTS = [
  { id: 1, title: 'The Nightfall',       desc: 'A 2D action-platformer with boss encounters across a jungle and a cyberpunk city, written from scratch in C with Raylib.', tags: ['C', 'Raylib', 'Game Dev'], lang: 'C',      link: GH + 'Project-Nightfall', featured: true },
  { id: 2, title: 'The Infected Hours',  desc: '2D arcade survival game built in Java for a university project — sprite handling, collision and game loop all hand-rolled.',                tags: ['Java', 'Game Dev'],        lang: 'Java',   link: GH + 'The-Infected-Hours', featured: true },
  { id: 3, title: 'Coders of Dhaka',     desc: 'A pure-Python parser for raw, unstructured Instagram profile dumps — cleans text, normalises metrics (12.5K → 12500) and answers descriptive queries with custom search. Zero external libraries.', tags: ['Python', 'Parsing'], lang: 'Python', link: GH + 'Codera_of_Dhaka', featured: true },
  { id: 4, title: 'People You May Know', desc: 'A social-network recommendation engine in core Python: mutual-connection analysis over a graph to suggest friends and pages, implemented with the standard library only.',                                   tags: ['Python', 'Graphs'],  lang: 'Python', link: GH + 'People-You-May-Know-A-Python-Recommendation-Engine', featured: true },
  { id: 5, title: 'Team Beetles',           desc: 'Collaborative university team project in Python.',                     tags: ['Python', 'Team'], lang: 'Python', link: GH + 'Team_Beetles' },
  { id: 6, title: 'Visual Programming Lab', desc: 'CSE 4402 coursework — JavaFX exercises covering UI layout, events and data binding.', tags: ['Java', 'JavaFX'], lang: 'Java', link: GH + 'CSE_4402_VisualProgrammingLab' },
  { id: 7, title: 'COA Assignment 2',       desc: 'Computer Organization & Architecture coursework — instruction-level work in C++.',    tags: ['C++', 'Systems'], lang: 'C++',  link: GH + 'COA_Assignment2_project' },
  { id: 8, title: 'CSE4302 Lab Project',    desc: 'Data structures and algorithms lab project built in C++.',             tags: ['C++', 'DSA'],     lang: 'C++',  link: GH + 'CSE4302_LabProject' },
  { id: 9, title: 'CSE4302 Labs',           desc: 'Full set of lab exercises from the CSE4302 course.',                   tags: ['C++', 'Coursework'], lang: 'C++', link: GH + 'CSE4302_Labs' },
];

const CAROUSEL = [
  { img: 'uploads/pasted-1784363735234-0.jpg', title: 'The Nightfall',       tag: 'C · Raylib · custom engine',      desc: 'Boss encounters across two hand-built worlds, with the render loop, collision and state machine written directly in C.', link: GH + 'Project-Nightfall' },
  { img: 'uploads/PeopleMayYouKnowEdited.jpg', title: 'People You May Know', tag: 'Python · graph algorithms',       desc: 'Mutual-connection analysis over a social graph — friend and page recommendations with no external libraries.', link: GH + 'People-You-May-Know-A-Python-Recommendation-Engine' },
  { img: 'uploads/CoderOfDhakaEdited.jpg',     title: 'Coders of Dhaka',     tag: 'Python · parsing · search',       desc: 'Turns messy scraped profile text into structured, queryable data using only the standard library.', link: GH + 'Codera_of_Dhaka' },
  { img: 'uploads/infectedHourEdited.jpg',     title: 'The Infected Hours',  tag: 'Java · 2D arcade',                desc: 'A survival arcade game built for a university project — collision, sprites and state machine by hand.', link: GH + 'The-Infected-Hours' },
];

const SHOTS = [
  { src: 'uploads/pasted-1784363735234-0.jpg', label: 'The Nightfall' },
  { src: 'uploads/people_may_You_Know.jpg',    label: 'People You May Know' },
  { src: 'uploads/coders_of_dhaka.jpg',        label: 'Coders of Dhaka' },
  { src: 'uploads/infectedHourEdited.jpg',     label: 'The Infected Hours' },
];

const SKILL_BARS = [
  { name: 'C / C++',              level: 'confident',   pct: 85 },
  { name: 'Python',               level: 'confident',   pct: 82 },
  { name: 'Java',                 level: 'comfortable', pct: 72 },
  { name: 'Data structures & algorithms', level: 'daily practice', pct: 75 },
  { name: 'Arduino & embedded',   level: 'hands-on',    pct: 62 },
  { name: 'AI / ML foundations',  level: 'learning',    pct: 48 },
];

const TECH = [
  { name: 'C',          note: 'systems, games' },
  { name: 'C++',        note: 'DSA, contests' },
  { name: 'Python',     note: 'engines, data' },
  { name: 'Java',       note: 'OOP, JavaFX' },
  { name: 'JavaScript', note: 'this site' },
  { name: 'NumPy',      note: 'numerical arrays' },
  { name: 'pandas',     note: 'dataframes' },
  { name: 'Matplotlib', note: 'plotting' },
  { name: 'Seaborn',    note: 'statistical viz' },
  { name: 'PostgreSQL', note: 'relational' },
  { name: 'Git',        note: 'version control' },
  { name: 'Arduino IDE',note: 'firmware' },
  { name: 'Raylib',     note: 'game rendering' },
  { name: 'VS Code',    note: 'daily driver' },
  { name: 'Linux',      note: 'toolchain' },
];

const CERTIFICATES = [
  { title: 'AI+ Prompt Engineer Level 1™', issuer: 'AI CERTs™',           date: 'Valid Aug 2025 — Aug 2026', badge: 'blockchain-verified', note: 'Prompt engineering and generative AI.' },
  { title: 'AgentX: Build Your Own Agent', issuer: 'NetCom Learning',     date: 'Sep 2025',                  badge: 'hands-on',            note: 'AI agent design, chatbot development, conversational AI.' },
  { title: 'Basic Arduino & Robotics',     issuer: 'IEEE RAS IUT SBC',    date: 'Nov 2024 — Feb 2025',       badge: 'workshop',            note: 'Arduino programming, robotics fundamentals, embedded systems.' },
];

const PC_SPECS = [
  { label: 'CPU',        value: 'AMD Ryzen 5 7600X' },
  { label: 'Cooler',     value: 'DeepCool AK400 Dark Plus' },
  { label: 'Motherboard',value: 'MSI PRO B650M-O DDR5' },
  { label: 'Memory',     value: '32 GB (2×16) G.Skill Ripjaws S5 DDR5-6000 CL32' },
  { label: 'Storage',    value: 'MIPHI MP700G4 512 GB PCIe Gen4 NVMe' },
  { label: 'GPU',        value: 'NVIDIA GeForce RTX 5060 Ti 16 GB' },
  { label: 'PSU',        value: 'Antec G750W 80+ Gold' },
  { label: 'Case',       value: 'Value-Top ARKVIEW RDF6 Micro-ATX' },
];

const CP_PLATFORMS = [
  { mark: 'CF', name: 'Codeforces', sub: 'contests & problem archive', url: LINKS.codeforces, color: '#FF6B7A' },
  { mark: 'LC', name: 'LeetCode',   sub: 'daily problem practice',     url: LINKS.leetcode,   color: '#FFB86B' },
];

const PHOTOS = [
  { src: 'uploads/1.jpg', cap: 'IUT campus · golden hour' },
  { src: 'uploads/2.jpg', cap: 'Between classes' },
  { src: 'uploads/3.jpg', cap: 'Campus, quiet side' },
];

const ROADMAP = [
  { when: 'next semester', title: 'Machine learning coursework', text: 'Formal ML modules begin next term, each paired with an applied project rather than problem sets alone.' },
  { when: 'in progress',   title: 'Research involvement',        text: 'Working toward a research assistantship through the Al Biruni Research Society. Nothing published yet — this section updates when that changes.' },
  { when: 'ongoing',       title: 'Autonomous robotics',         text: 'Moving beyond workshop builds into sensor fusion and closed-loop control with the R&D Panel.' },
  { when: 'this year',     title: 'Open-source contribution',    text: 'Every repository listed here is my own. Contributing to an established codebase is the next step.' },
];

const ACHIEVEMENTS = {
  visit:    { ico: '👋', title: 'First contact',      sub: 'you found the site' },
  konami:   { ico: '🕹', title: 'Konami decoder',      sub: '↑↑↓↓←→←→ B A' },
  copy:     { ico: '📋', title: 'Copy that',          sub: 'email in your clipboard' },
  fun:      { ico: '🐟', title: 'Fun Mode engaged',    sub: 'the page is now a platformer' },
  fishwin:  { ico: '🏆', title: 'Bottom of the sea',   sub: 'traversed the whole portfolio' },
  theme:    { ico: '🌗', title: 'Both sides',         sub: 'flipped the theme' },
  deep:     { ico: '🧭', title: 'Completionist',      sub: 'scrolled the entire page' },
  logo:     { ico: '🥚', title: 'Curious clicker',    sub: 'you triple-clicked the logo' },
};

/* ── 2. Utilities ───────────────────────────────────────────────────── */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;

const store = {
  get(k, fb) { try { const v = localStorage.getItem(k); return v === null ? fb : JSON.parse(v); } catch { return fb; } },
  set(k, v)  { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* One shared observer factory — observers disconnect after firing (docs/04). */
function revealOnce(el, cb, threshold = 0.15) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      cb(e.target);
      io.unobserve(e.target);
    });
  }, { threshold, rootMargin: '0px 0px -8% 0px' });
  io.observe(el);
  return io;
}

/* ── 3. Boot ────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initNav();
  initCursor();
  initScrollChrome();
  initReveal();
  initSplitText();
  initHeroName();
  initTypewriter();
  initCounters();
  initMagnetic();
  initTilt();
  initRipples();
  initClickBurst();
  initPortraitParticles();

  renderPills();
  renderTimeline();
  renderExperience();
  renderCarousel();
  renderMarquee();
  renderProjects();
  renderSkills();
  renderCertificates();
  renderSpecs();
  renderCP();
  renderPhotos();
  renderRoadmap();

  initFlipCards();
  initModal();
  initCopyEmail();
  initLightbox();
  initEasterEggs();
  initFunMode();

  $('#year').textContent = new Date().getFullYear();
  flagPlaceholderLinks();

  // First-visit achievement, after the loader clears.
  setTimeout(() => award('visit'), REDUCED ? 400 : 1900);
  consoleBanner();
});

/* ── 4. Chrome ──────────────────────────────────────────────────────── */

function initTheme() {
  const saved = store.get('af-theme', null);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.dataset.theme = theme;

  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('af-theme', next);
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#0A0E1A' : '#F7F8FB');
    award('theme');
  });
}

function initLoader() {
  const loader = $('#loader');
  const seen = store.get('af-seen', false);

  const dismiss = () => {
    loader.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  };

  if (seen || REDUCED) { loader.style.transition = 'none'; dismiss(); return; }

  document.body.classList.add('no-scroll');
  store.set('af-seen', true);
  const timer = setTimeout(dismiss, 1500);
  const skip = () => { clearTimeout(timer); dismiss(); };
  $('#loader-skip').addEventListener('click', skip);
  window.addEventListener('keydown', skip, { once: true });
  loader.addEventListener('click', skip);
}

function initNav() {
  const nav = $('#navbar');
  const links = $$('.navlink');
  const indicator = $('#nav-indicator');
  const sheet = $('#mobile-sheet');
  const menuBtn = $('#menu-toggle');

  const moveIndicator = (el) => {
    if (!el) { indicator.classList.remove('on'); return; }
    indicator.style.width = el.offsetWidth + 'px';
    indicator.style.transform = `translateX(${el.offsetLeft}px)`;
    indicator.classList.add('on');
  };

  links.forEach((l) => {
    l.addEventListener('mouseenter', () => moveIndicator(l));
  });
  $('#nav-links').addEventListener('mouseleave', () => {
    moveIndicator($('.navlink.active'));
  });

  // Scroll-spy
  const sections = links
    .map((l) => ({ link: l, el: $(l.getAttribute('href')) }))
    .filter((s) => s.el);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const match = sections.find((s) => s.el === e.target);
      if (!match) return;
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        match.link.classList.add('active');
        moveIndicator(match.link);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s.el));

  // Glass intensifies on scroll
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile sheet
  const closeSheet = () => {
    sheet.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };
  menuBtn.addEventListener('click', () => {
    const open = sheet.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  });
  $$('#mobile-sheet a').forEach((a) => a.addEventListener('click', closeSheet));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });

  // Smooth anchor scrolling with nav offset
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: REDUCED ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
}

function initCursor() {
  if (!FINE_POINTER || REDUCED) return;
  document.body.classList.add('pointer-fine');
  const glow = $('#cursor-glow');
  const dot = $('#cursor-dot');
  let gx = 0, gy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px)`;
  }, { passive: true });

  // Glow lags behind the dot — the spotlight feels heavier than the pointer.
  (function follow() {
    gx += (tx - gx) * 0.12;
    gy += (ty - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(follow);
  })();

  const grow = 'a, button, .flip-inner, .photo-item, .proj-card, input, textarea, .pill-list li';
  document.addEventListener('mouseover', (e) => {
    document.body.classList.toggle('cursor-grow', !!e.target.closest(grow));
  });
}

function initScrollChrome() {
  const fill = $('#progress-fill');
  let deepAwarded = false;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    fill.style.width = pct + '%';
    if (pct > 97 && !deepAwarded) { deepAwarded = true; award('deep'); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── 5. Motion ──────────────────────────────────────────────────────── */

function initReveal() {
  $$('[data-reveal]').forEach((el) => revealOnce(el, (t) => t.classList.add('in')));
}

function initSplitText() {
  $$('.splitwords').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = w;
      span.style.transitionDelay = `${i * 26}ms`;
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
    revealOnce(el, (t) => t.classList.add('in'), 0.3);
  });
}

function initHeroName() {
  let index = 0;
  $$('.hero-name .split').forEach((part) => {
    const text = part.dataset.split;
    part.textContent = '';
    [...text].forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      s.style.setProperty('--ci', index++);
      part.appendChild(s);
    });
    part.setAttribute('aria-hidden', 'false');
  });
}

function initTypewriter() {
  const target = $('#type-target');
  if (REDUCED) { target.textContent = TYPE_ROLES[0]; return; }

  let phrase = 0, char = 0, deleting = false;

  const tick = () => {
    const full = TYPE_ROLES[phrase];
    char += deleting ? -1 : 1;
    target.textContent = full.slice(0, char);

    let delay = deleting ? 34 : 62;
    if (!deleting && char === full.length) { delay = 1900; deleting = true; }
    else if (deleting && char === 0) { deleting = false; phrase = (phrase + 1) % TYPE_ROLES.length; delay = 320; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1400);
}

function initCounters() {
  $$('[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix || '';
    if (REDUCED) { el.textContent = prefix + target; return; }

    revealOnce(el, () => {
      const dur = 1100;
      const start = performance.now();
      const step = (now) => {
        const p = clamp((now - start) / dur, 0, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  });
}

function initMagnetic() {
  if (!FINE_POINTER || REDUCED) return;
  $$('.magnetic, .logo').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.32;
      el.style.transform = `translate(${clamp(x, -10, 10)}px, ${clamp(y, -10, 10)}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* Tilt + hover-lighting. Cards expose --mx/--my for their radial glow. */
function attachTilt(el, maxDeg = 5) {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', px * 100 + '%');
    el.style.setProperty('--my', py * 100 + '%');
    if (REDUCED || !FINE_POINTER) return;
    el.style.transform =
      `perspective(900px) rotateX(${(py - 0.5) * -maxDeg * 2}deg) rotateY(${(px - 0.5) * maxDeg * 2}deg) translateY(-4px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
}

function initTilt() {
  $$('.tilt').forEach((el) => attachTilt(el, 4));

  const portrait = $('#portrait-tilt');
  if (portrait && FINE_POINTER && !REDUCED) {
    portrait.addEventListener('mousemove', (e) => {
      const r = portrait.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.animation = 'none';
      portrait.style.transform = `perspective(1000px) rotateX(${py * -9}deg) rotateY(${px * 11}deg) scale(1.02)`;
    });
    portrait.addEventListener('mouseleave', () => {
      portrait.style.transform = '';
      portrait.style.animation = '';
    });
  }
}

/* Ripple on every button — the "click effect on everything" pass. */
function initRipples() {
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.btn, .filters button, .icon-btn, .exp-tab, .car-arrow, .lb-btn');
    if (!btn || REDUCED) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = e.clientX - r.left - size / 2 + 'px';
    span.style.top = e.clientY - r.top - size / 2 + 'px';
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.appendChild(span);
    setTimeout(() => span.remove(), 640);
  });
}

/* Accent particles burst from every pointer press, anywhere on the page. */
function initClickBurst() {
  if (REDUCED) return;
  document.addEventListener('pointerdown', (e) => {
    if (document.body.classList.contains('fun-active')) return;
    const n = 9;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'spark';
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      const dist = 26 + Math.random() * 46;
      const size = 3 + Math.random() * 4;
      p.style.width = p.style.height = size + 'px';
      p.style.left = e.clientX + 'px';
      p.style.top = e.clientY + 'px';
      if (i % 3 === 0) p.style.background = 'var(--accent-2)';
      document.body.appendChild(p);
      p.animate(
        [
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 },
        ],
        { duration: 520 + Math.random() * 260, easing: 'cubic-bezier(.22,1,.36,1)' }
      ).onfinish = () => p.remove();
    }
  });
}

/* ASCII-particle portrait — technique ported from the Gazi-V2 reference repo,
   rebuilt without React. Renders the portrait as density-mapped glyphs that
   scatter away from the pointer and spring back. */
function initPortraitParticles() {
  const canvas = $('#particle-portrait');
  const frame = $('#portrait-tilt');
  const img = $('#portrait-img');
  // Runs on touch devices too — the portrait is the hero's signature moment, and
  // gating it on a fine pointer left phones looking at a plain photo. Interaction
  // comes from touch instead; the IntersectionObserver still parks it off-screen.
  if (!canvas || REDUCED) return;

  const CHARS = ' .:-=+*#%@'.split('');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W = 0, H = 0, fontSize = 6;
  let mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
  let raf = 0, startedAt = 0;

  function build() {
    const rect = frame.getBoundingClientRect();
    W = Math.round(rect.width);
    H = Math.round(rect.height);
    if (!W || !H) return false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    fontSize = W < 260 ? 5 : 6;
    const colGap = fontSize * 0.72;
    const rowGap = fontSize * 1.06;

    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const octx = off.getContext('2d', { willReadFrequently: true });
    // cover-fit the portrait into the frame, same as CSS object-fit: cover
    const ar = img.naturalWidth / img.naturalHeight;
    let dw = W, dh = W / ar;
    if (dh < H) { dh = H; dw = H * ar; }
    octx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

    let px;
    try { px = octx.getImageData(0, 0, W, H).data; }
    catch { return false; } // tainted canvas (file:// origin) — keep the <img>

    particles = [];
    for (let y = 0; y < H; y += rowGap) {
      for (let x = 0; x < W; x += colGap) {
        const i = (Math.floor(y) * W + Math.floor(x)) * 4;
        if (px[i + 3] < 120) continue;
        const bright = (px[i] + px[i + 1] + px[i + 2]) / 765;
        if (bright < 0.08) continue;
        particles.push({
          x: x + (Math.random() - 0.5) * 240,
          y: y + (Math.random() - 0.5) * 240,
          tx: x, ty: y, vx: 0, vy: 0,
          ch: CHARS[Math.floor(bright * (CHARS.length - 1))],
          alpha: 0.35 + bright * 0.65,
          delay: Math.random() * 0.35,
        });
      }
    }
    return particles.length > 0;
  }

  function draw() {
    raf = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    const elapsed = (performance.now() - startedAt) / 1000;

    mouse.x += (mouse.tx - mouse.x) * 0.16;
    mouse.y += (mouse.ty - mouse.y) * 0.16;

    ctx.font = `${fontSize}px ${getComputedStyle(document.body).getPropertyValue('--font-mono') || 'monospace'}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4FE3C1';

    for (const p of particles) {
      const t = elapsed - p.delay;
      if (t < 0) continue;

      const fade = Math.min(t / 1.4, 1);
      const settle = 1 - Math.pow(1 - Math.min(t / 2.2, 1), 3);

      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const reach = W * 0.28;
        if (d < reach && d > 0.5) {
          const f = (1 - d / reach) * 4.2;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }

      p.vx += (p.tx - p.x) * (0.012 + settle * 0.08);
      p.vy += (p.ty - p.y) * (0.012 + settle * 0.08);
      p.vx *= 0.9; p.vy *= 0.9;
      p.x += p.vx; p.y += p.vy;

      ctx.globalAlpha = p.alpha * fade;
      ctx.fillStyle = accent;
      ctx.fillText(p.ch, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  }

  function start() {
    if (!build()) return;
    frame.classList.add('particles-on');
    startedAt = performance.now();
    cancelAnimationFrame(raf);
    draw();
  }

  // Bootstrap must not depend on rAF: a page opened in a background tab has its
  // frame callbacks suspended, so an rAF-gated start would leave the hero as a
  // plain photo forever. ResizeObserver fires once layout settles either way.
  const ready = () => { if (img.complete && img.naturalWidth) start(); else img.addEventListener('load', start, { once: true }); };
  if (typeof ResizeObserver === 'function') {
    const ro = new ResizeObserver(() => {
      if (frame.getBoundingClientRect().width > 0) { ro.disconnect(); ready(); }
    });
    ro.observe(frame);
  } else {
    setTimeout(ready, 120);
  }

  const track = (clientX, clientY) => {
    const r = frame.getBoundingClientRect();
    mouse.tx = clientX - r.left;
    mouse.ty = clientY - r.top;
    mouse.active = true;
  };
  const release = () => {
    mouse.active = false;
    mouse.tx = -9999; mouse.ty = -9999;
  };

  frame.addEventListener('mousemove', (e) => track(e.clientX, e.clientY));
  frame.addEventListener('mouseleave', release);

  // Touch: drag a finger across the portrait to scatter the glyphs. Passive, so
  // dragging past the portrait still scrolls the page normally.
  frame.addEventListener('touchstart', (e) => track(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  frame.addEventListener('touchmove',  (e) => track(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  frame.addEventListener('touchend', release);
  frame.addEventListener('touchcancel', release);

  // Resume, or build for the first time if the tab was hidden at load.
  const resume = () => {
    if (!particles.length) { ready(); return; }
    if (!raf) draw();
  };

  // Pause when off-screen or the tab is hidden (docs/04 perf guardrails).
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) resume();
    else { cancelAnimationFrame(raf); raf = 0; }
  }, { threshold: 0 });
  io.observe(frame);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else resume();
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (particles.length) start(); }, 250);
  });
}

/* ── 6. Sections ────────────────────────────────────────────────────── */

/* Both stack rows are continuous tickers. `textOnly` items have no brand mark
   (they're fields of study, not products) and render as dashed outline chips. */
function buildTicker(trackSel, items, { textOnly = false } = {}) {
  const track = $(trackSel);
  if (!track) return;

  const chip = (name) => {
    const logo = textOnly ? null : TECH_LOGOS[name];
    const li = document.createElement('li');
    li.className = 'logo-chip' + (textOnly ? ' is-text' : '');
    li.style.setProperty('--brand', logo ? logo.color : 'var(--accent)');
    li.innerHTML = (logo
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${logo.path}"/></svg>`
      : '') + `<span>${name}</span>`;
    return li;
  };

  // Two identical passes: the track translates exactly -50%, so the seam lands
  // where the copies meet and the loop reads as continuous.
  items.forEach((n) => track.appendChild(chip(n)));
  const clones = document.createElement('li');
  clones.className = 'logo-clones';
  clones.setAttribute('aria-hidden', 'true');   // don't read the row twice
  items.forEach((n) => clones.appendChild(chip(n)));
  track.appendChild(clones);

  // Pace by content length, so a longer row doesn't scroll faster.
  track.style.setProperty('--marquee-dur', Math.max(18, items.length * 3.4) + 's');
}

function renderPills() {
  buildTicker('#stack-list', CURRENT_STACK);
  buildTicker('#explore-list', EXPLORING, { textOnly: true });
}

function renderTimeline() {
  const ol = $('#timeline');
  EDUCATION.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'tl-item';
    li.innerHTML = `
      <span class="tl-node" aria-hidden="true"></span>
      <p class="tl-date">${item.date}</p>
      <h3>${item.title}</h3>
      <p class="tl-org">${item.org}</p>
      <span class="tl-meta">${item.meta}</span>
      <p class="tl-note">${item.note}</p>`;
    ol.appendChild(li);
    revealOnce(li, (t) => t.classList.add('in'), 0.25);
  });

  // Rail draws with scroll progress through the timeline.
  const fill = $('#tl-fill');
  const onScroll = () => {
    const r = ol.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp((vh * 0.75 - r.top) / (r.height + vh * 0.1), 0, 1);
    fill.style.height = progress * 100 + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function renderExperience() {
  const tabsWrap = $('#exp-tabs');
  const panelsWrap = $('#exp-panels');
  const indicator = $('#exp-indicator');

  EXPERIENCE.forEach((item, i) => {
    const tab = document.createElement('button');
    tab.className = 'exp-tab';
    tab.type = 'button';
    tab.id = `tab-${item.id}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `panel-${item.id}`);
    tab.setAttribute('aria-selected', String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.textContent = item.tab;
    tabsWrap.appendChild(tab);

    const panel = document.createElement('div');
    panel.className = 'exp-panel' + (i === 0 ? ' active' : '');
    panel.id = `panel-${item.id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${item.id}`);
    panel.innerHTML = `
      <h3>${item.role} <span class="exp-org">@ ${item.org}</span></h3>
      <p class="exp-date">${item.date}</p>
      <ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`;
    panelsWrap.appendChild(panel);
  });

  const tabs = $$('.exp-tab', tabsWrap);
  const panels = $$('.exp-panel', panelsWrap);
  const horizontal = () => window.matchMedia('(max-width: 820px)').matches;

  const select = (idx, focus = false) => {
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', String(i === idx));
      t.tabIndex = i === idx ? 0 : -1;
    });
    panels.forEach((p, i) => p.classList.toggle('active', i === idx));
    const t = tabs[idx];
    if (horizontal()) {
      indicator.style.height = '2px';
      indicator.style.width = t.offsetWidth + 'px';
      indicator.style.transform = `translateX(${t.offsetLeft}px)`;
    } else {
      indicator.style.width = '2px';
      indicator.style.height = t.offsetHeight + 'px';
      indicator.style.transform = `translateY(${t.offsetTop}px)`;
    }
    if (focus) t.focus();
  };

  tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
  tabsWrap.addEventListener('keydown', (e) => {
    const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const nextKeys = horizontal() ? ['ArrowRight'] : ['ArrowDown'];
    const prevKeys = horizontal() ? ['ArrowLeft'] : ['ArrowUp'];
    if (nextKeys.includes(e.key)) { e.preventDefault(); select((cur + 1) % tabs.length, true); }
    if (prevKeys.includes(e.key)) { e.preventDefault(); select((cur - 1 + tabs.length) % tabs.length, true); }
    if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    if (e.key === 'End')  { e.preventDefault(); select(tabs.length - 1, true); }
  });

  requestAnimationFrame(() => select(0));
  window.addEventListener('resize', () => {
    const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    select(Math.max(0, cur));
  });
}

function renderCarousel() {
  const media = $('#slide-bg');
  const dotsWrap = $('#carousel-dots');
  const timer = $('#carousel-timer');
  const el = $('#carousel');
  let index = 0;
  let auto = null;
  let progressRaf = 0;
  const DURATION = 6500;

  CAROUSEL.forEach((c, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', c.title);
    b.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(b);
  });
  const dots = $$('button', dotsWrap);

  function go(i) {
    index = (i + CAROUSEL.length) % CAROUSEL.length;
    const c = CAROUSEL[index];
    media.classList.add('swap');
    setTimeout(() => {
      media.style.backgroundImage = `url('${c.img}')`;
      media.classList.remove('swap');
    }, REDUCED ? 0 : 220);
    $('#slide-tag').textContent = c.tag;
    $('#slide-title').textContent = c.title;
    $('#slide-desc').textContent = c.desc;
    $('#slide-link').href = c.link;
    dots.forEach((d, di) => d.setAttribute('aria-selected', String(di === index)));
  }

  function restart() {
    clearInterval(auto);
    cancelAnimationFrame(progressRaf);
    if (REDUCED) { timer.style.width = '0%'; return; }
    let start = performance.now();
    auto = setInterval(() => { go(index + 1); start = performance.now(); }, DURATION);
    const tick = (now) => {
      timer.style.width = clamp((now - start) / DURATION, 0, 1) * 100 + '%';
      progressRaf = requestAnimationFrame(tick);
    };
    progressRaf = requestAnimationFrame(tick);
  }

  $('#carousel-prev').addEventListener('click', () => { go(index - 1); restart(); });
  $('#carousel-next').addEventListener('click', () => { go(index + 1); restart(); });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(index - 1); restart(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); restart(); }
  });
  el.addEventListener('mouseenter', () => { clearInterval(auto); cancelAnimationFrame(progressRaf); });
  el.addEventListener('mouseleave', restart);

  // Swipe on touch
  let sx = 0;
  el.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) { go(index + (dx < 0 ? 1 : -1)); restart(); }
  }, { passive: true });

  // Only run the autoplay while the carousel is on screen.
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) restart();
    else { clearInterval(auto); cancelAnimationFrame(progressRaf); }
  }, { threshold: 0.2 }).observe(el);

  go(0);
}

function renderMarquee() {
  const track = $('#marquee-track');
  SHOTS.concat(SHOTS).forEach((s) => {
    const d = document.createElement('div');
    d.className = 'shot';
    d.innerHTML = `<img src="${s.src}" alt="${s.label} screenshot" loading="lazy">`;
    track.appendChild(d);
  });
}

function renderProjects() {
  const FILTERS = ['Featured', 'All', 'Python', 'Java', 'C', 'C++'];
  const filtersWrap = $('#filters');
  const grid = $('#project-grid');
  let active = 'Featured';

  const folderSVG = `<svg class="folder-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
  const ghSVG = `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`;

  function render() {
    const list =
      active === 'Featured' ? PROJECTS.filter((p) => p.featured) :
      active === 'All' ? PROJECTS :
      PROJECTS.filter((p) => p.lang === active);

    grid.innerHTML = '';
    list.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'proj-card';
      card.style.setProperty('--i', i);
      card.innerHTML = `
        <div class="proj-top">
          ${folderSVG}
          <div class="proj-links">
            <a class="icon-btn" href="${p.link}" target="_blank" rel="noopener" aria-label="${p.title} on GitHub">${ghSVG}</a>
          </div>
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="proj-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>`;
      attachTilt(card, 4);
      grid.appendChild(card);
      // Stagger in on the next frame so the transition actually plays.
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in')));
    });
  }

  FILTERS.forEach((f) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', String(f === active));
    b.textContent = f;
    b.addEventListener('click', () => {
      active = f;
      $$('button', filtersWrap).forEach((x) => x.setAttribute('aria-selected', String(x.textContent === f)));
      render();
    });
    filtersWrap.appendChild(b);
  });

  render();
}

function renderSkills() {
  const bars = $('#skill-bars');
  SKILL_BARS.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.innerHTML = `
      <div class="skill-top"><span class="skill-name">${s.name}</span><span class="skill-lvl">${s.level}</span></div>
      <div class="skill-track"><span class="skill-fill" style="--d:${i * 90}ms"></span></div>`;
    bars.appendChild(row);
  });
  revealOnce(bars, () => {
    $$('.skill-fill', bars).forEach((f, i) => { f.style.width = SKILL_BARS[i].pct + '%'; });
  }, 0.25);

  const cloud = $('#tech-cloud');
  TECH.forEach((t, i) => {
    const chip = document.createElement('div');
    chip.className = 'tech-chip';
    chip.style.setProperty('--i', i);
    chip.innerHTML = `<b>${t.name}</b><span>${t.note}</span>`;
    cloud.appendChild(chip);
  });
  revealOnce(cloud, (el) => el.classList.add('in'), 0.15);
}

function renderCertificates() {
  const grid = $('#cert-grid');
  CERTIFICATES.forEach((c, i) => {
    const card = document.createElement('article');
    card.className = 'cert-card';
    card.style.setProperty('--i', i);
    card.innerHTML = `
      <span class="cert-badge">${c.badge}</span>
      <h3>${c.title}</h3>
      <p class="cert-issuer">${c.issuer}</p>
      <p class="cert-date">${c.date}</p>
      <p class="cert-issuer" style="margin-top:10px">${c.note}</p>`;
    attachTilt(card, 3);
    grid.appendChild(card);
    revealOnce(card, (el) => el.classList.add('in'), 0.2);
  });
}

function renderSpecs() {
  const wrap = $('#pc-specs');
  PC_SPECS.forEach((r) => {
    const d = document.createElement('div');
    d.className = 'spec-row';
    d.innerHTML = `<span class="label">${r.label}</span><span class="value">${r.value}</span>`;
    wrap.appendChild(d);
  });

  // If a PC photo has been dropped in, use it instead of the placeholder.
  const probe = new Image();
  probe.onload = () => {
    $('#pc-media').innerHTML = '<img src="uploads/pc-setup.jpg" alt="Abrar\'s PC build" loading="lazy">';
  };
  probe.src = 'uploads/pc-setup.jpg';
}

function renderCP() {
  const grid = $('#cp-grid');
  CP_PLATFORMS.forEach((p, i) => {
    const a = document.createElement('a');
    a.className = 'cp-card';
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.setProperty('--i', i);
    a.style.setProperty('--cp-color', p.color);
    a.innerHTML = `<span class="cp-mark">${p.mark}</span><div><h3>${p.name}</h3><p>${p.sub}</p></div>`;
    if (p.url.includes('yourusername')) a.dataset.placeholderLink = '';
    grid.appendChild(a);
    revealOnce(a, (el) => el.classList.add('in'), 0.2);
  });
}

function renderPhotos() {
  const grid = $('#photo-grid');
  PHOTOS.forEach((p, i) => {
    const fig = document.createElement('figure');
    fig.className = 'photo-item';
    fig.style.setProperty('--i', i);
    fig.dataset.index = i;
    fig.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy"><figcaption class="photo-cap">${p.cap}</figcaption>`;
    fig.setAttribute('role', 'button');
    fig.tabIndex = 0;
    grid.appendChild(fig);
    revealOnce(fig, (el) => el.classList.add('in'), 0.2);
  });
}

function renderRoadmap() {
  const track = $('#roadmap-track');
  ROADMAP.forEach((r, i) => {
    const card = document.createElement('article');
    card.className = 'road-card';
    card.innerHTML = `
      <span class="road-idx">${String(i + 1).padStart(2, '0')}</span>
      <p class="road-when">${r.when}</p>
      <h3>${r.title}</h3>
      <p>${r.text}</p>`;
    track.appendChild(card);
  });

  // Drag-to-scroll on the horizontal track.
  const scroller = $('#roadmap-scroll');
  let down = false, startX = 0, startScroll = 0;
  scroller.addEventListener('pointerdown', (e) => {
    down = true; startX = e.clientX; startScroll = scroller.scrollLeft;
    scroller.style.cursor = 'grabbing';
  });
  window.addEventListener('pointerup', () => { down = false; scroller.style.cursor = ''; });
  scroller.addEventListener('pointermove', (e) => {
    if (!down) return;
    scroller.scrollLeft = startScroll - (e.clientX - startX);
  });
}

/* ── 7. Interactions ────────────────────────────────────────────────── */

function initFlipCards() {
  ['pc-flip', 'arduino-flip'].forEach((id) => {
    const el = $('#' + id);
    if (!el) return;
    const toggle = () => el.classList.toggle('flipped');
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

function initModal() {
  const modal = $('#contact-modal');
  const form = $('#contact-form');
  const err = $('#f-error');
  const submit = $('#f-submit');
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.classList.remove('sent');
    form.reset();
    err.classList.remove('show');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('#f-name').focus(), 60);
  };
  const close = () => {
    modal.classList.remove('open');
    document.body.classList.remove('no-scroll');
    lastFocus?.focus();
  };

  // Optional chaining so removing any single entry point from the markup
  // doesn't throw and take the rest of the boot chain down with it.
  $('#open-contact')?.addEventListener('click', open);
  $('#contact-cta')?.addEventListener('click', open);
  $('#modal-close')?.addEventListener('click', close);
  $('#modal-close-2')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });

  // Focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusables = $$('button, input, textarea, a[href]', modal).filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#f-name').value.trim();
    const email = $('#f-email').value.trim();
    const subject = $('#f-subject').value.trim();
    const message = $('#f-message').value.trim();

    if (!name || !email || !subject || !message) {
      err.textContent = 'Please fill in every field before sending.';
      err.classList.add('show');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = 'That email address does not look right.';
      err.classList.add('show');
      return;
    }
    err.classList.remove('show');
    submit.textContent = 'Saving…';
    submit.disabled = true;

    // No backend yet — this only reaches the visitor's own localStorage.
    // See PROGRESS.md "deliberately not built".
    const existing = store.get('portfolio-messages', []);
    existing.push({ name, email, subject, message, ts: Date.now() });
    store.set('portfolio-messages', existing);

    setTimeout(() => {
      submit.innerHTML = 'Send message <span class="btn-arrow">→</span>';
      submit.disabled = false;
      $('#thanks-msg').textContent = `Thanks, ${name}. This form has no backend yet, so please also email ${LINKS.email} to make sure the message reaches me.`;
      modal.classList.add('sent');
    }, 600);
  });
}

function initCopyEmail() {
  $$('.copy-email').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        toast('📋', 'Email copied', email);
        award('copy');
      } catch {
        window.location.href = 'mailto:' + email;
      }
    });
  });
}

function initLightbox() {
  const box = $('#lightbox');
  const img = $('#lb-img');
  const cap = $('#lb-caption');
  let index = 0;

  const show = (i) => {
    index = (i + PHOTOS.length) % PHOTOS.length;
    img.src = PHOTOS[index].src;
    img.alt = PHOTOS[index].cap;
    cap.textContent = `${PHOTOS[index].cap} — ${index + 1} / ${PHOTOS.length}`;
  };
  const open = (i) => { show(i); box.classList.add('open'); document.body.classList.add('no-scroll'); $('#lb-close').focus(); };
  const close = () => { box.classList.remove('open'); document.body.classList.remove('no-scroll'); };

  $('#photo-grid').addEventListener('click', (e) => {
    const item = e.target.closest('.photo-item');
    if (item) open(Number(item.dataset.index));
  });
  $('#photo-grid').addEventListener('keydown', (e) => {
    const item = e.target.closest('.photo-item');
    if (item && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(Number(item.dataset.index)); }
  });

  $('#lb-close').addEventListener('click', close);
  $('#lb-prev').addEventListener('click', () => show(index - 1));
  $('#lb-next').addEventListener('click', () => show(index + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  window.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

function toast(ico, title, sub) {
  const stack = $('#toast-stack');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="t-ico">${ico}</span><div class="t-body"><b>${title}</b><span>${sub}</span></div>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 340);
  }, 3200);
}

function award(key) {
  const a = ACHIEVEMENTS[key];
  if (!a) return;
  const unlocked = store.get('af-achievements', []);
  if (unlocked.includes(key)) return;
  unlocked.push(key);
  store.set('af-achievements', unlocked);
  toast(a.ico, a.title, `achievement · ${a.sub}`);
}

/* Placeholder links get a tooltip instead of silently 404-ing. */
function flagPlaceholderLinks() {
  $$('[data-placeholder-link], a[href*="yourusername"]').forEach((a) => {
    a.title = 'Profile link not set yet';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      toast('🔗', 'Link not set yet', 'this profile URL is still a placeholder');
    });
  });
}

/* ── 8. Easter eggs ─────────────────────────────────────────────────── */

function initEasterEggs() {
  // Konami → CRT flash
  const CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = key === CODE[pos] ? pos + 1 : (key === CODE[0] ? 1 : 0);
    if (pos === CODE.length) {
      pos = 0;
      document.body.classList.add('crt');
      setTimeout(() => document.body.classList.remove('crt'), 1900);
      award('konami');
    }
  });

  // Triple-click the logo
  let clicks = 0, timer;
  $('#logo').addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 600);
    if (clicks === 3) {
      clicks = 0;
      const jokes = [
        'There are 10 kinds of people: those who read binary, and those who get this joke explained.',
        'It works on my machine — Ryzen 5 7600X, so that is not saying much.',
        'I would tell you a UDP joke, but you might not get it.',
        'Deleted node_modules once. The disk light stayed on for a week.',
      ];
      toast('🥚', 'Easter egg', jokes[Math.floor(Math.random() * jokes.length)]);
      award('logo');
    }
  });
}

function consoleBanner() {
  const style = 'color:#4FE3C1;font-family:monospace;font-size:12px';
  console.log(
    `%c
   ___  ___  ____  ___  ____
  / _ |/ _ )/ __ \\/ _ |/ __ \\
 / __ / _  / /_/ / __ / /_/ /
/_/ |_/____/\\_, /_/ |_\\_, *_/
           /_/       /_*/`,
    style
  );
  console.log('%cAbrar Faiyaz — CSE @ IUT', 'color:#4FE3C1;font-weight:bold;font-size:14px');
  console.log(
    `%cYou opened the console. Good instinct.
This site is hand-written HTML/CSS/JS — no framework, no build step.
Source: ${LINKS.github}
Hiring, research, or a project idea? ${LINKS.email}
Try the Konami code. Or Fun Mode.`,
    'color:#9AA3B8;font-family:monospace;line-height:1.6'
  );
}

/* ── 9. Fun Mode — Fish Climb ───────────────────────────────────────────
   The whole portfolio is the playground: every line of text on the page
   becomes a platform, and the win condition is reaching the footer.
   ───────────────────────────────────────────────────────────────────── */

function initFunMode() {
  const toggle = $('#fun-toggle');
  const dot = $('#fun-dot');
  const canvas = $('#fun-canvas');
  const ctx = canvas.getContext('2d');
  const progressEl = $('#fun-progress');
  const winOverlay = $('#fun-win-overlay');

  const GRAVITY = 0.55, JUMP = -12.5, SPEED = 4.4;
  const FW = 34, FH = 24, PLAT_MAX_W = 170;

  let on = false, platforms = [], fish = null, facing = 1, raf = 0, docH = 0, won = false;
  let keys = { left: false, right: false, jump: false, drop: false };

  function sizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Deterministic jitter so ledge layout survives a rebuild (e.g. resize).
  const seeded = (s) => { const v = Math.sin(s * 12.9898) * 43758.5453; return v - Math.floor(v); };

  function buildPlatforms() {
    platforms = [];
    docH = document.documentElement.scrollHeight;
    const sel = 'main h1, main h2, main h3, main p, main li, main .float-pill, main .hero-badge, ' +
                'main .mono-label, main .mini-card, main .cp-card, main .filters button, main .btn, ' +
                'main .tech-chip, main .spec-row, footer p, footer a';
    const sy = window.scrollY;

    const vw = window.innerWidth;

    $$(sel).forEach((el) => {
      if (el.closest('#navbar') || el.closest('#contact-modal') || el.closest('#fun-hud') || el.closest('#lightbox')) return;
      // Skip the scrolling tickers and the screenshot marquee: their contents
      // move every frame, so a rect captured now is wrong a moment later, and
      // their tracks are max-content wide — the chips report positions far
      // outside the viewport and carpet the page in unreachable ledges.
      if (el.closest('.logo-marquee') || el.closest('.marquee') || el.closest('[aria-hidden="true"]')) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed' || +cs.opacity < 0.2) return;

      for (const r of el.getClientRects()) {
        if (r.width < 40 || r.height < 8 || r.height > 220) continue;
        // Anything off-screen horizontally can never be stood on.
        if (r.right < 0 || r.left > vw) continue;

        if (r.width <= PLAT_MAX_W) { platforms.push({ x: r.left, y: r.top + sy, w: r.width }); continue; }
        // Long text lines get chopped into jumpable ledges with gaps.
        let x = r.left, n = 0;
        const end = r.left + r.width;
        // Ledges 80–140px with 65–130px holes — wide enough that walking off an
        // edge is a viable way down, not just the S key.
        while (x < end - 50) {
          const segW = Math.min(80 + seeded(r.top + sy + x + n) * 60, end - x);
          platforms.push({ x, y: r.top + sy, w: segW });
          x += segW + 65 + seeded(r.top + sy + x * 1.7 + n * 3) * 65;
          n++;
        }
      }
    });

    platforms.sort((a, b) => a.y - b.y);
    platforms = thinPlatforms(platforms);
  }

  /* Descent has to stay possible. Two platforms stacked a few pixels apart with
     the same horizontal span form a lid the fish can land on but not drop past
     in one S-press, so collapse near-duplicate ledges into one. */
  function thinPlatforms(list) {
    const MIN_GAP_Y = 26;
    const kept = [];
    for (const p of list) {
      const blocked = kept.some((q) =>
        Math.abs(q.y - p.y) < MIN_GAP_Y &&
        p.x < q.x + q.w && p.x + p.w > q.x
      );
      if (!blocked) kept.push(p);
    }
    return kept;
  }

  function start() {
    window.scrollTo(0, 0);
    // Let the scroll land before measuring, so rects are document-accurate.
    requestAnimationFrame(() => {
      buildPlatforms();
      fish = { x: window.innerWidth / 2 - FW / 2, y: 10, vx: 0, vy: 0, grounded: false };
      keys = { left: false, right: false, jump: false, drop: false };
      facing = 1;
      won = false;
      winOverlay.classList.remove('show');
      progressEl.textContent = '0%';
      cancelAnimationFrame(raf);
      loop();
    });
  }

  function update() {
    fish.vx = (keys.right ? SPEED : 0) - (keys.left ? SPEED : 0);
    if (fish.vx > 0) facing = 1; else if (fish.vx < 0) facing = -1;
    fish.x = clamp(fish.x + fish.vx, 0, window.innerWidth - FW);

    if (keys.jump && fish.grounded) { fish.vy = JUMP; fish.grounded = false; }

    fish.vy = Math.min(fish.vy + GRAVITY, 16);
    const prevBottom = fish.y + FH;
    fish.y += fish.vy;
    const newBottom = fish.y + FH;

    fish.grounded = false;
    if (fish.vy >= 0 && !keys.drop) {
      for (const p of platforms) {
        if (p.y < prevBottom - 1) continue;
        if (p.y > newBottom) break;
        if (fish.x < p.x + p.w && fish.x + FW > p.x) {
          fish.y = p.y - FH; fish.vy = 0; fish.grounded = true;
          break;
        }
      }
    }
    if (fish.y < 0) { fish.y = 0; fish.vy = 0; }

    if (newBottom >= docH - 30 && !won) {
      won = true;
      winOverlay.classList.add('show');
      award('fishwin');
    }

    const maxScroll = docH - window.innerHeight;
    window.scrollTo(0, clamp(fish.y - window.innerHeight * 0.42, 0, maxScroll));
    progressEl.textContent = clamp(Math.round((fish.y / (docH - window.innerHeight - 40)) * 100), 0, 100) + '%';
  }

  function draw() {
    const vw = window.innerWidth, vh = window.innerHeight;
    ctx.clearRect(0, 0, vw, vh);
    const sy = window.scrollY;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4FE3C1';

    // Standable lines, drawn on their top edge.
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.5;
    for (const p of platforms) {
      const py = p.y - sy;
      if (py < -10 || py > vh + 10) continue;
      ctx.beginPath();
      ctx.roundRect(p.x, py - 2, p.w, 2.5, 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const screenY = fish.y - sy;
    if (fish.grounded) {
      ctx.fillStyle = 'rgba(0,0,0,.2)';
      ctx.beginPath();
      ctx.ellipse(fish.x + FW / 2, screenY + FH + 3, FW * 0.42, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(fish.x + FW / 2, screenY + FH / 2);
    if (!fish.grounded) ctx.rotate(Math.sin(performance.now() / 90) * 0.12);
    // The 🐟 glyph points LEFT by default, so an unflipped draw already faces
    // left. Negate the scale or the sprite looks the opposite of the key held.
    ctx.scale(-facing, 1);
    ctx.fillText('🐟', 0, 2);
    ctx.restore();
  }

  function loop() {
    if (!on) return;
    if (!won) update();
    draw();
    raf = requestAnimationFrame(loop);
  }

  function enter() {
    on = true;
    document.body.classList.add('fun-active');
    dot.classList.add('on');
    toggle.setAttribute('aria-pressed', 'true');
    sizeCanvas();
    start();
    award('fun');
  }

  function exit() {
    on = false;
    document.body.classList.remove('fun-active');
    dot.classList.remove('on');
    toggle.setAttribute('aria-pressed', 'false');
    winOverlay.classList.remove('show');
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  toggle.addEventListener('click', () => (on ? exit() : enter()));
  $('#fun-exit-btn').addEventListener('click', exit);
  $('#fun-win-exit-btn').addEventListener('click', exit);
  $('#fun-restart-btn').addEventListener('click', start);

  window.addEventListener('keydown', (e) => {
    if (!on) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'Escape') { exit(); return; }
    const k = e.key.toLowerCase();
    if (k === 'a' || e.key === 'ArrowLeft') keys.left = true;
    if (k === 'd' || e.key === 'ArrowRight') keys.right = true;
    if (k === 's' || e.key === 'ArrowDown') { keys.drop = true; e.preventDefault(); }
    if (k === 'w' || e.key === ' ' || e.key === 'ArrowUp') { keys.jump = true; e.preventDefault(); }
  });
  window.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'a' || e.key === 'ArrowLeft') keys.left = false;
    if (k === 'd' || e.key === 'ArrowRight') keys.right = false;
    if (k === 's' || e.key === 'ArrowDown') keys.drop = false;
    if (k === 'w' || e.key === ' ' || e.key === 'ArrowUp') keys.jump = false;
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    if (!on) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { sizeCanvas(); buildPlatforms(); }, 200);
  });
}
