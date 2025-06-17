% process_data.m
% Dummy MATLAB script for seismic signal processing

disp('Loading seismic data...');

% Simulasi data
fs = 100;                     % Sampling frequency
t = 0:1/fs:5;                 % Time vector
signal = sin(2*pi*10*t);      % Simulated seismic signal (10 Hz)

% Plot sinyal
figure;
plot(t, signal);
title('Simulated Seismic Signal');
xlabel('Time (s)');
ylabel('Amplitude');

disp('Signal processing complete.');
