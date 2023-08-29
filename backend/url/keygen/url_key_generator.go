package keygen

import (
	"math/rand"
	"time"

	"github.com/somnamul1st/blyacc/backend/core"
)

const (
	keySize  = 5
	chars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	charsLen = len(chars)
)

type urlKeyGenerator struct{}

func NewURLKeyGenerator() core.URLKeyGenerator {
	rand.Seed(time.Now().UnixNano())
	return &urlKeyGenerator{}
}

func (kg *urlKeyGenerator) GenerateKey() string {
	b := make([]byte, keySize)
	for i := range b {
		b[i] = chars[rand.Intn(charsLen)]
	}
	return string(b)
}
