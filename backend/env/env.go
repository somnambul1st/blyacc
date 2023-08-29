package env

import (
	"net/url"

	"github.com/kelseyhightower/envconfig"
)

type urlDecoder url.URL

func (ud *urlDecoder) Decode(value string) error {
	u, err := url.Parse(value)
	if err != nil {
		return err
	}

	*ud = urlDecoder(*u)
	return nil
}

type existsDecoder bool

func (ed *existsDecoder) Decode(string) error {
	*ed = true
	return nil
}

type envSpec struct {
	Port                    int        `envconfig:"PORT" default:"3000"`
	URL                     urlDecoder `envconfig:"URL" required:"true"`
	RedisURL                string     `envconfig:"REDIS_URL"`
	ReCAPTCHASecret         string     `envconfig:"RECAPTCHA_SECRET" required:"true"`
	ReCAPTCHAScoreThreshold float32    `envconfig:"RECAPTCHA_SCORE_THRESHOLD" default:"0.5"`
	AllowedOrigins          []string   `envconfig:"ALLOWED_ORIGINS"`

	// By the existence of the AWS_LAMBDA_FUNCTION_NAME environment variable we
	// can tell that we're running in AWS Lambda
	IsLambda existsDecoder `envconfig:"AWS_LAMBDA_FUNCTION_NAME"`
}

type Spec struct {
	Port                    int
	URL                     *url.URL
	RedisURL                string
	ReCAPTCHASecret         string
	ReCAPTCHAScoreThreshold float32
	AllowedOrigins          []string
	IsLambda                bool
}

func GetEnv() Spec {
	var e envSpec
	envconfig.MustProcess("", &e)

	return Spec{
		Port:                    e.Port,
		URL:                     (*url.URL)(&e.URL),
		RedisURL:                e.RedisURL,
		ReCAPTCHASecret:         e.ReCAPTCHASecret,
		ReCAPTCHAScoreThreshold: e.ReCAPTCHAScoreThreshold,
		AllowedOrigins:          e.AllowedOrigins,
		IsLambda:                bool(e.IsLambda),
	}
}
