--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 17.0

-- Started on 2025-01-28 18:17:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 19810)
-- Name: Database Schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "Database Schema";


ALTER SCHEMA "Database Schema" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 18811)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18793)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id text NOT NULL,
    content text NOT NULL,
    id_photo text,
    id_user text,
    status boolean DEFAULT false
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18776)
-- Name: downloads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.downloads (
    id text NOT NULL,
    id_photo text,
    id_user text
);


ALTER TABLE public.downloads OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18759)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id text NOT NULL,
    id_photo text,
    id_user text
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18746)
-- Name: photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos (
    id text NOT NULL,
    user_id text NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    path text NOT NULL,
    status boolean DEFAULT false
);


ALTER TABLE public.photos OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18818)
-- Name: photos_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photos_categories (
    id text NOT NULL,
    id_photo text,
    id_category text
);


ALTER TABLE public.photos_categories OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 18734)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    username character varying(25) NOT NULL,
    email character varying(30) NOT NULL,
    password text NOT NULL,
    access_level boolean DEFAULT false,
    user_icon text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4836 (class 0 OID 18811)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description) FROM stdin;
aa0e8400-e29b-41d4-a716-446655440000	Nature	Photos of nature and landscapes
aa0e8400-e29b-41d4-a716-446655440001	Animals	Wildlife and pet photography
aa0e8400-e29b-41d4-a716-446655440002	Urban	City life and street photography
aa0e8400-e29b-41d4-a716-446655440003	People	Portraits and candid people photography
aa0e8400-e29b-41d4-a716-446655440004	Sports	Athletic events and sports activities
aa0e8400-e29b-41d4-a716-446655440005	Travel	Travel destinations and experiences
aa0e8400-e29b-41d4-a716-446655440006	Food	Culinary and food photography
aa0e8400-e29b-41d4-a716-446655440007	Architecture	Buildings and architectural details
aa0e8400-e29b-41d4-a716-446655440008	Art	Artistic and abstract photography
aa0e8400-e29b-41d4-a716-446655440009	Fashion	Fashion and style photography
\.


--
-- TOC entry 4835 (class 0 OID 18793)
-- Dependencies: 220
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, id_photo, id_user, status) FROM stdin;
990e8400-e29b-41d4-a716-446655440000	Great photo!	660e8400-e29b-41d4-a716-446655440000	550e8400-e29b-41d4-a716-446655440001	t
990e8400-e29b-41d4-a716-446655440001	Amazing shot!	660e8400-e29b-41d4-a716-446655440001	550e8400-e29b-41d4-a716-446655440002	f
990e8400-e29b-41d4-a716-446655440002	Nice angle.	660e8400-e29b-41d4-a716-446655440002	550e8400-e29b-41d4-a716-446655440003	t
990e8400-e29b-41d4-a716-446655440003	Beautiful colors!	660e8400-e29b-41d4-a716-446655440003	550e8400-e29b-41d4-a716-446655440004	f
990e8400-e29b-41d4-a716-446655440004	Stunning!	660e8400-e29b-41d4-a716-446655440004	550e8400-e29b-41d4-a716-446655440005	t
990e8400-e29b-41d4-a716-446655440005	I love it!	660e8400-e29b-41d4-a716-446655440005	550e8400-e29b-41d4-a716-446655440006	f
990e8400-e29b-41d4-a716-446655440006	Great capture!	660e8400-e29b-41d4-a716-446655440006	550e8400-e29b-41d4-a716-446655440007	t
990e8400-e29b-41d4-a716-446655440007	So cool!	660e8400-e29b-41d4-a716-446655440007	550e8400-e29b-41d4-a716-446655440008	f
990e8400-e29b-41d4-a716-446655440008	Fantastic!	660e8400-e29b-41d4-a716-446655440008	550e8400-e29b-41d4-a716-446655440009	t
990e8400-e29b-41d4-a716-446655440009	Love this!	660e8400-e29b-41d4-a716-446655440009	550e8400-e29b-41d4-a716-446655440000	f
fe358e89-532a-4139-8a94-efdcd33c9e92	This is a comment.	660e8400-e29b-41d4-a716-446655440004	b3902bd6-883e-4d43-a496-d63b943b70c1	t
189c7324-821e-4031-852c-6819d668a7f5	Does this work?	660e8400-e29b-41d4-a716-446655440004	0cb7613c-5adf-4b41-96d9-98248f6d5a8f	t
\.


--
-- TOC entry 4834 (class 0 OID 18776)
-- Dependencies: 219
-- Data for Name: downloads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.downloads (id, id_photo, id_user) FROM stdin;
880e8400-e29b-41d4-a716-446655440000	660e8400-e29b-41d4-a716-446655440000	550e8400-e29b-41d4-a716-446655440002
880e8400-e29b-41d4-a716-446655440001	660e8400-e29b-41d4-a716-446655440001	550e8400-e29b-41d4-a716-446655440003
880e8400-e29b-41d4-a716-446655440002	660e8400-e29b-41d4-a716-446655440002	550e8400-e29b-41d4-a716-446655440004
880e8400-e29b-41d4-a716-446655440003	660e8400-e29b-41d4-a716-446655440003	550e8400-e29b-41d4-a716-446655440005
880e8400-e29b-41d4-a716-446655440004	660e8400-e29b-41d4-a716-446655440004	550e8400-e29b-41d4-a716-446655440006
880e8400-e29b-41d4-a716-446655440005	660e8400-e29b-41d4-a716-446655440005	550e8400-e29b-41d4-a716-446655440007
880e8400-e29b-41d4-a716-446655440006	660e8400-e29b-41d4-a716-446655440006	550e8400-e29b-41d4-a716-446655440008
880e8400-e29b-41d4-a716-446655440007	660e8400-e29b-41d4-a716-446655440007	550e8400-e29b-41d4-a716-446655440009
880e8400-e29b-41d4-a716-446655440008	660e8400-e29b-41d4-a716-446655440008	550e8400-e29b-41d4-a716-446655440000
880e8400-e29b-41d4-a716-446655440009	660e8400-e29b-41d4-a716-446655440009	550e8400-e29b-41d4-a716-446655440001
90f9dc90-a6ae-438a-b489-43186f38c150	660e8400-e29b-41d4-a716-446655440004	b3902bd6-883e-4d43-a496-d63b943b70c1
\.


--
-- TOC entry 4833 (class 0 OID 18759)
-- Dependencies: 218
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, id_photo, id_user) FROM stdin;
770e8400-e29b-41d4-a716-446655440000	660e8400-e29b-41d4-a716-446655440000	550e8400-e29b-41d4-a716-446655440001
770e8400-e29b-41d4-a716-446655440001	660e8400-e29b-41d4-a716-446655440001	550e8400-e29b-41d4-a716-446655440002
770e8400-e29b-41d4-a716-446655440002	660e8400-e29b-41d4-a716-446655440002	550e8400-e29b-41d4-a716-446655440003
770e8400-e29b-41d4-a716-446655440003	660e8400-e29b-41d4-a716-446655440003	550e8400-e29b-41d4-a716-446655440004
770e8400-e29b-41d4-a716-446655440004	660e8400-e29b-41d4-a716-446655440004	550e8400-e29b-41d4-a716-446655440005
770e8400-e29b-41d4-a716-446655440005	660e8400-e29b-41d4-a716-446655440005	550e8400-e29b-41d4-a716-446655440006
770e8400-e29b-41d4-a716-446655440006	660e8400-e29b-41d4-a716-446655440006	550e8400-e29b-41d4-a716-446655440007
770e8400-e29b-41d4-a716-446655440007	660e8400-e29b-41d4-a716-446655440007	550e8400-e29b-41d4-a716-446655440008
770e8400-e29b-41d4-a716-446655440008	660e8400-e29b-41d4-a716-446655440008	550e8400-e29b-41d4-a716-446655440009
770e8400-e29b-41d4-a716-446655440009	660e8400-e29b-41d4-a716-446655440009	550e8400-e29b-41d4-a716-446655440000
29ea585a-41fd-4445-8a94-6c356c77e71b	660e8400-e29b-41d4-a716-446655440004	b3902bd6-883e-4d43-a496-d63b943b70c1
\.


--
-- TOC entry 4832 (class 0 OID 18746)
-- Dependencies: 217
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos (id, user_id, name, description, path, status) FROM stdin;
660e8400-e29b-41d4-a716-446655440004	550e8400-e29b-41d4-a716-446655440004	Photo5	Description5	/images/demo/image-5.jpg	t
660e8400-e29b-41d4-a716-446655440000	550e8400-e29b-41d4-a716-446655440000	Photo1	Description1	/images/demo/image-1.jpg	t
660e8400-e29b-41d4-a716-446655440002	550e8400-e29b-41d4-a716-446655440002	Photo3	Description3	/images/demo/image-3.jpg	t
660e8400-e29b-41d4-a716-446655440006	550e8400-e29b-41d4-a716-446655440006	Photo7	Description7	/images/demo/image-7.jpg	t
660e8400-e29b-41d4-a716-446655440008	550e8400-e29b-41d4-a716-446655440008	Photo9	Description9	/images/demo/image-9.jpg	t
660e8400-e29b-41d4-a716-446655440009	550e8400-e29b-41d4-a716-446655440009	Photo10	Description10	/images/demo/image-10.jpg	f
660e8400-e29b-41d4-a716-446655440001	550e8400-e29b-41d4-a716-446655440001	Photo2	Description2	/images/demo/image-2.jpg	t
660e8400-e29b-41d4-a716-446655440003	550e8400-e29b-41d4-a716-446655440003	Photo4	Description4	/images/demo/image-4.jpg	t
660e8400-e29b-41d4-a716-446655440005	550e8400-e29b-41d4-a716-446655440005	Photo6	Description6	/images/demo/image-6.jpg	t
660e8400-e29b-41d4-a716-446655440007	550e8400-e29b-41d4-a716-446655440007	Photo8	Description8	/images/demo/image-8.jpg	f
051a100f-d2c8-42c7-80c8-7a2825a4948a	b3902bd6-883e-4d43-a496-d63b943b70c1	asfasdf		/images/users/2ec7eb2a-1c6e-4d02-a812-f6ba7fc63c9a.jpg	t
007dc6fb-9e1f-49ea-90b7-df4587c7b70f	b3902bd6-883e-4d43-a496-d63b943b70c1	hdfdfgh		/images/users/e402baef-e669-4de7-9bc0-6540c7031a9a.png	t
d1cb9515-cb5f-4c72-991b-236ed0752999	b3902bd6-883e-4d43-a496-d63b943b70c1	ygzdxfg	afsdfasd	/images/users/e3c71c53-50e0-4096-973a-c746d518444b.jpg	t
898907a9-9bb8-4f3c-8bf8-afc9fb11b851	b3902bd6-883e-4d43-a496-d63b943b70c1	My photo	My description	/images/users/96c3eceb-b3d1-4fd8-b7e9-eb3fedffc3a7.jpg	f
e053cde0-6db7-4d42-a1c3-d221c22c37fb	b3902bd6-883e-4d43-a496-d63b943b70c1	gsdfg		/images/users/7306b0ac-120e-4688-add2-435d16ed644e.png	f
27cc27de-1d69-4fbe-9d57-f460b744b7c4	b3902bd6-883e-4d43-a496-d63b943b70c1	Another Photo	Another description	/images/users/bf863973-0857-4656-867f-c5f2a530eecd.jpg	t
\.


--
-- TOC entry 4837 (class 0 OID 18818)
-- Dependencies: 222
-- Data for Name: photos_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photos_categories (id, id_photo, id_category) FROM stdin;
bb0e8400-e29b-41d4-a716-446655440000	660e8400-e29b-41d4-a716-446655440000	aa0e8400-e29b-41d4-a716-446655440000
bb0e8400-e29b-41d4-a716-446655440001	660e8400-e29b-41d4-a716-446655440001	aa0e8400-e29b-41d4-a716-446655440001
bb0e8400-e29b-41d4-a716-446655440002	660e8400-e29b-41d4-a716-446655440002	aa0e8400-e29b-41d4-a716-446655440002
bb0e8400-e29b-41d4-a716-446655440003	660e8400-e29b-41d4-a716-446655440003	aa0e8400-e29b-41d4-a716-446655440003
bb0e8400-e29b-41d4-a716-446655440004	660e8400-e29b-41d4-a716-446655440004	aa0e8400-e29b-41d4-a716-446655440004
bb0e8400-e29b-41d4-a716-446655440005	660e8400-e29b-41d4-a716-446655440005	aa0e8400-e29b-41d4-a716-446655440005
bb0e8400-e29b-41d4-a716-446655440006	660e8400-e29b-41d4-a716-446655440006	aa0e8400-e29b-41d4-a716-446655440006
bb0e8400-e29b-41d4-a716-446655440007	660e8400-e29b-41d4-a716-446655440007	aa0e8400-e29b-41d4-a716-446655440007
bb0e8400-e29b-41d4-a716-446655440008	660e8400-e29b-41d4-a716-446655440008	aa0e8400-e29b-41d4-a716-446655440008
bb0e8400-e29b-41d4-a716-446655440009	660e8400-e29b-41d4-a716-446655440009	aa0e8400-e29b-41d4-a716-446655440009
b3991c81-c3d0-4796-9ec0-378814096f63	27cc27de-1d69-4fbe-9d57-f460b744b7c4	aa0e8400-e29b-41d4-a716-446655440009
\.


--
-- TOC entry 4831 (class 0 OID 18734)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, access_level, user_icon) FROM stdin;
550e8400-e29b-41d4-a716-446655440001	user2	user2@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
550e8400-e29b-41d4-a716-446655440002	user3	user3@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
550e8400-e29b-41d4-a716-446655440003	user4	user4@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	t	
550e8400-e29b-41d4-a716-446655440004	user5	user5@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
550e8400-e29b-41d4-a716-446655440005	user6	user6@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
550e8400-e29b-41d4-a716-446655440006	user7	user7@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	t	
550e8400-e29b-41d4-a716-446655440007	user8	user8@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
550e8400-e29b-41d4-a716-446655440008	user9	user9@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	t	
550e8400-e29b-41d4-a716-446655440009	user10	user10@example.com	$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi	f	
0cb7613c-5adf-4b41-96d9-98248f6d5a8f	user	user@user.com	$2a$10$pN9yuOD.cFN88.JdpdtODubIz/sjOzp1.Wdjo1UATeVblb7o8qMvy	f	/images/users/04a4826c-0754-4264-970b-eeca75da6582.jpg
b3902bd6-883e-4d43-a496-d63b943b70c1	testuser	test@test.com	$2a$10$h8gDM3NUNmJFNuACfXy52un6QMOI4kUq3wGg6ZCWiRkC2z9MDYFGq	f	
550e8400-e29b-41d4-a716-446655440000	Administrator	user1@example.com	$2a$10$mUVY.k3x9n3vxFE2oErlQe4UNCGkQusgGzVcDC7.bpLmevuXbar8q	t	/images/users/e7f3b1e9-7959-4d65-a692-e7ebc0d6de61.png
\.


--
-- TOC entry 4676 (class 2606 OID 18817)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4674 (class 2606 OID 18800)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4672 (class 2606 OID 18782)
-- Name: downloads downloads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downloads
    ADD CONSTRAINT downloads_pkey PRIMARY KEY (id);


--
-- TOC entry 4670 (class 2606 OID 18765)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 4678 (class 2606 OID 18824)
-- Name: photos_categories photos_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos_categories
    ADD CONSTRAINT photos_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4668 (class 2606 OID 18753)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 4662 (class 2606 OID 18745)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4664 (class 2606 OID 18741)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4666 (class 2606 OID 18743)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4684 (class 2606 OID 18801)
-- Name: comments comments_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photos(id);


--
-- TOC entry 4685 (class 2606 OID 18806)
-- Name: comments comments_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4682 (class 2606 OID 18783)
-- Name: downloads downloads_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downloads
    ADD CONSTRAINT downloads_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photos(id);


--
-- TOC entry 4683 (class 2606 OID 18788)
-- Name: downloads downloads_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downloads
    ADD CONSTRAINT downloads_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4680 (class 2606 OID 18766)
-- Name: likes likes_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photos(id);


--
-- TOC entry 4681 (class 2606 OID 18771)
-- Name: likes likes_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4686 (class 2606 OID 18830)
-- Name: photos_categories photos_categories_id_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos_categories
    ADD CONSTRAINT photos_categories_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- TOC entry 4687 (class 2606 OID 18825)
-- Name: photos_categories photos_categories_id_photo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos_categories
    ADD CONSTRAINT photos_categories_id_photo_fkey FOREIGN KEY (id_photo) REFERENCES public.photos(id);


--
-- TOC entry 4679 (class 2606 OID 18754)
-- Name: photos photos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-01-28 18:17:22

--
-- PostgreSQL database dump complete
--

