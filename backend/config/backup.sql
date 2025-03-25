--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: channel_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channel_user (
    id integer NOT NULL,
    channel_id integer,
    user_id integer
);


ALTER TABLE public.channel_user OWNER TO postgres;

--
-- Name: channel_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.channel_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channel_user_id_seq OWNER TO postgres;

--
-- Name: channel_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.channel_user_id_seq OWNED BY public.channel_user.id;


--
-- Name: channels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    title character varying(30),
    isactive boolean DEFAULT true,
    user_id integer
);


ALTER TABLE public.channels OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_id_seq OWNER TO postgres;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    channel_id integer,
    user_id integer,
    content text
);


ALTER TABLE public.message OWNER TO postgres;

--
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_id_seq OWNER TO postgres;

--
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    password character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: channel_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user ALTER COLUMN id SET DEFAULT nextval('public.channel_user_id_seq'::regclass);


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: channel_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channel_user (id, channel_id, user_id) FROM stdin;
6	5	3
7	4	2
8	5	2
11	6	2
12	6	3
15	1	3
16	4	3
17	7	2
18	8	2
19	9	2
21	11	2
22	1	4
23	1	2
\.


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.channels (id, title, isactive, user_id) FROM stdin;
1	ch1	t	2
4	ch2	t	3
5	ch3	t	3
6	ch4	t	2
7	ch5	t	2
8	ch6	t	2
9	ch7	t	2
11	ch8	t	2
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (id, created_at, channel_id, user_id, content) FROM stdin;
1	2025-03-10 14:21:30.2699	1	2	hi
2	2025-03-10 14:21:48.107677	1	2	how are you
3	2025-03-10 14:36:30.981264	1	3	hi
4	2025-03-10 14:36:43.863662	1	3	i'm ok
5	2025-03-10 14:36:49.698938	1	3	and you?
6	2025-03-10 14:43:26.415535	1	2	i'm ok too
7	2025-03-10 14:45:09.754416	4	2	hi
8	2025-03-10 14:45:26.672365	4	3	hi
9	2025-03-10 15:05:32.75883	1	2	loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
10	2025-03-10 15:06:06.264935	1	3	you're not ok
11	2025-03-10 15:06:16.633207	1	3	loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
13	2025-03-12 13:51:00.68382	1	4	hey
14	2025-03-12 14:03:08.393747	1	4	lorem
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password) FROM stdin;
1	john	$2b$10$3ow38ziPZ3p1sHgLrqe8oO5eTxG4UO.4EH8JuXf2aFADYK8RiS1.2
2	max	$2b$10$vTPTI8cm8.ATavwcq7C.pe6vQoHgoey13.XKRCw9T3itfzIdKVtC2
3	ser	$2b$10$gpEDs.UxQEgvdAoSVsPNj.IVUn.L4dRrPwD1gK7pxJ4oX7p1.MFyu
4	vovi	$2b$10$vK9XMWO20vaxxX7wa3oZ7.Z1q60xVDEHpSZDX6hBxd5.hvw.Lorse
6	logan	$2b$10$A2IeaxVHA0jtBhUdqBVXwe8GMZdcRMLCtxwlxkMRoPz.MC0pYzcra
9	логин	$2b$10$Q1jlhJ9x.skIk5tci2xebOE7M4W52J7oXkl6PfQe5qJX7cQ1VfolC
10	блонд	$2b$10$zUTgZtJpIhKQqsM6jixICOvGNdDtyvq/ldqHNHwxp8qNrixH6YrAK
11	логан	$2b$10$pAdoxNeFSe63xLrLPoLsH.t2FpmEhX8jGkt76/m5obktV8f9nQ4cK
12	wef	$2b$10$yFhkaqUpKBr9tS2BBhgpJeX.HJ1ojfcJGet9yQnqodX5BQtdLO1lW
13	Andrew	$2b$10$woohWpTL73Y9L36Kh3WkeubPCHqcvYpM/Uofe7QbCXEehKwdN4Wzu
14	vasiliy	$2b$10$0vJ0aLNSUigIuuAkRDhEkeI2r6H1coL4Fg7Ws3yat5iksZ7l7w/nm
15	vasya	$2b$10$KNdXCaNsRoprK.yAswFLlO/F54Wp7XBXxLn2d1lIQ67jfM4IKMAtC
16	adminsha	$2b$10$qfPYK8t1pcFgwKKo5AVUfuy5.sGXl4O.rl2d3gNw2wVK6gXQI1OHK
\.


--
-- Name: channel_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channel_user_id_seq', 24, true);


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.channels_id_seq', 12, true);


--
-- Name: message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: channel_user channel_user_channel_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT channel_user_channel_id_user_id_key UNIQUE (channel_id, user_id);


--
-- Name: channel_user channel_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT channel_user_pkey PRIMARY KEY (id);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: channel_user channel_user_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT channel_user_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: channel_user channel_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channel_user
    ADD CONSTRAINT channel_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: channels channels_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: message message_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE;


--
-- Name: message message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

