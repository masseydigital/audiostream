
import essentia
import essentia.standard
import sys

filepath = sys.argv[1]

loader = essentia.standard.MonoLoader(filename = filepath)

audio = loader()

def Inharmonicity(audioInput):
	Spec = essentia.standard.Spectrum()
	Peaks = essentia.standard.SpectralPeaks()
	Harm = essentia.standard.HarmonicPeaks()
	Inharmony = essentia.standard.Inharmonicity()
	inharmony = Inharmony(Harm(Peaks(Spec(audio))))
	return inharmony


print 'Inharmonicity: %f' % Inharmonicity(audioInput = audio)
