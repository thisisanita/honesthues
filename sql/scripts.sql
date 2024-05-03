-- Table: public.brands

-- DROP TABLE IF EXISTS public.brands;

CREATE TABLE IF NOT EXISTS public.brands
(
    id integer NOT NULL DEFAULT nextval('brands_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash character(60) COLLATE pg_catalog."default" NOT NULL,
    contact_person character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    brand_avatar character varying(255) COLLATE pg_catalog."default",
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact character(20) COLLATE pg_catalog."default" NOT NULL,
    address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    website character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT brands_pkey PRIMARY KEY (id),
    CONSTRAINT brands_email_key UNIQUE (email),
    CONSTRAINT brands_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.brands
    OWNER to db_user;


-- Table: public.campaigns

-- DROP TABLE IF EXISTS public.campaigns;

CREATE TABLE IF NOT EXISTS public.campaigns
(
    id integer NOT NULL DEFAULT nextval('campaigns_id_seq'::regclass),
    campaign_picture character varying(255) COLLATE pg_catalog."default",
    campaign_description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    campaign_credit integer NOT NULL,
    product_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    product_picture character varying(255) COLLATE pg_catalog."default",
    product_description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    product_likes integer,
    product_shades character varying(255) COLLATE pg_catalog."default",
    product_shades_picture character varying(255) COLLATE pg_catalog."default",
    product_ingredients character varying(1000) COLLATE pg_catalog."default",
    product_instructions character varying(500) COLLATE pg_catalog."default",
    brand_id integer,
    campaign_name character varying(50) COLLATE pg_catalog."default",
    date_time date DEFAULT CURRENT_TIMESTAMP,
    campaign_requests integer,
    CONSTRAINT campaigns_pkey PRIMARY KEY (id),
    CONSTRAINT fk_brand_campaigns FOREIGN KEY (brand_id)
        REFERENCES public.brands (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.campaigns
    OWNER to db_user;


-- Table: public.requests

-- DROP TABLE IF EXISTS public.requests;

CREATE TABLE IF NOT EXISTS public.requests
(
    id integer NOT NULL DEFAULT nextval('requests_id_seq'::regclass),
    date_time date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    received boolean,
    user_id integer,
    campaign_id integer,
    product_shade character varying(50) COLLATE pg_catalog."default",
    submitted boolean,
    CONSTRAINT requests_pkey PRIMARY KEY (id),
    CONSTRAINT fk_campaigns_requests FOREIGN KEY (campaign_id)
        REFERENCES public.campaigns (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_users_requests FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.requests
    OWNER to db_user;


-- Table: public.reviews

-- DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    id integer NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
    "timestamp" date DEFAULT CURRENT_TIMESTAMP,
    rating character(60) COLLATE pg_catalog."default" NOT NULL,
    details character varying(500) COLLATE pg_catalog."default",
    picture character varying(255) COLLATE pg_catalog."default",
    review_helpful boolean,
    review_flag boolean,
    review_recommendation boolean,
    campaign_id integer,
    user_id integer,
    title character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT fk_campaigns_reviews FOREIGN KEY (campaign_id)
        REFERENCES public.campaigns (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_users_reviews FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to db_user;


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password_hash character(60) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_avatar character varying(255) COLLATE pg_catalog."default",
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact character(20) COLLATE pg_catalog."default" NOT NULL,
    address character varying(50) COLLATE pg_catalog."default" NOT NULL,
    fun_facts character varying(255) COLLATE pg_catalog."default",
    gender character varying(100) COLLATE pg_catalog."default",
    age_group character varying(100) COLLATE pg_catalog."default",
    skin_tone character varying(100) COLLATE pg_catalog."default",
    skin_type character varying(100) COLLATE pg_catalog."default",
    hair_colour character varying(100) COLLATE pg_catalog."default",
    eye_colour character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to db_user;


-- Table: public.wallet

-- DROP TABLE IF EXISTS public.wallet;

CREATE TABLE IF NOT EXISTS public.wallet
(
    id integer NOT NULL DEFAULT nextval('wallet_id_seq'::regclass),
    total_amount integer,
    user_id integer,
    CONSTRAINT wallet_pkey PRIMARY KEY (id),
    CONSTRAINT fk_users_wallet FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wallet
    OWNER to db_user;